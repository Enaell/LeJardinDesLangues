import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, AuthResponse, TokenPair } from './auth.service';
import { AuthResponseDto } from './dto/auth.response.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';
const IS_AUTHENTICATED_COOKIE = 'is_authenticated';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  private getCookieOptions(maxAgeMs: number) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
      path: '/',
      maxAge: maxAgeMs,
    };
  }

  private setAuthCookies(res: Response, tokens: TokenPair): void {
    const accessMaxAge = 15 * 60 * 1000; // 15 minutes
    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours

    res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, this.getCookieOptions(accessMaxAge));
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, this.getCookieOptions(refreshMaxAge));

    // Cookie non-httpOnly pour que le JS sache si l'utilisateur est connecté
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.cookie(IS_AUTHENTICATED_COOKIE, 'true', {
      httpOnly: false,
      secure: isProduction,
      sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
      path: '/',
      maxAge: refreshMaxAge,
    });
  }

  private clearAuthCookies(res: Response): void {
    const clearOptions = { path: '/', maxAge: 0 };
    res.cookie(ACCESS_TOKEN_COOKIE, '', clearOptions);
    res.cookie(REFRESH_TOKEN_COOKIE, '', clearOptions);
    res.cookie(IS_AUTHENTICATED_COOKIE, '', clearOptions);
  }

  @Post('register')
  @ApiOperation({ summary: "Inscription d'un nouvel utilisateur" })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: AuthResponseDto })
  @ApiResponse({ status: 409, description: "Email ou nom d'utilisateur déjà utilisé" })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const authResponse = await this.authService.register(registerDto);
    const payload = {
      sub: authResponse.user.id,
      email: authResponse.user.email,
      username: authResponse.user.username,
      role: authResponse.user.role,
    };
    const tokens = await this.authService.generateTokenPair(payload);
    this.setAuthCookies(res, tokens);
    return authResponse;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Connexion d'un utilisateur" })
  @ApiResponse({ status: 200, description: 'Connexion réussie', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const authResponse = await this.authService.login(loginDto);
    const payload = {
      sub: authResponse.user.id,
      email: authResponse.user.email,
      username: authResponse.user.username,
      role: authResponse.user.role,
    };
    const tokens = await this.authService.generateTokenPair(payload);
    this.setAuthCookies(res, tokens);
    return authResponse;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renouveler les tokens via le refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens renouvelés' })
  @ApiResponse({ status: 403, description: 'Refresh token invalide ou expiré' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token manquant');
    }

    let payload: { sub: string; };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      this.clearAuthCookies(res);
      throw new UnauthorizedException('Refresh token invalide');
    }

    const tokens = await this.authService.refreshTokens(payload.sub, refreshToken);
    this.setAuthCookies(res, tokens);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Déconnexion et invalidation de la session' })
  @ApiResponse({ status: 204, description: 'Déconnexion réussie' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const user = req.user as { id: string; };
    await this.authService.logout(user.id);
    this.clearAuthCookies(res);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Authentification avec Google' })
  async googleAuth() {
    // Cette route redirige vers Google OAuth
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback Google OAuth' })
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const corsOrigin = this.configService.get('CORS_ORIGIN') || 'http://localhost:5173';

    try {
      const authResponse = req.user as AuthResponse;
      const payload = {
        sub: authResponse.user.id,
        email: authResponse.user.email,
        username: authResponse.user.username,
        role: authResponse.user.role,
      };
      const tokens = await this.authService.generateTokenPair(payload);
      this.setAuthCookies(res, tokens);

      const html = `<!DOCTYPE html>
<html>
<head><title>Authentification réussie</title></head>
<body>
<script>
  try {
    window.opener.postMessage({
      type: 'GOOGLE_AUTH_SUCCESS',
      payload: ${JSON.stringify({ user: authResponse.user })}
    }, '${corsOrigin}');
    window.close();
  } catch (e) {
    document.body.innerHTML = '<p>Authentification réussie. Vous pouvez fermer cette fenêtre.</p>';
  }
</script>
<p>Authentification en cours...</p>
</body>
</html>`;

      res.send(html);
    } catch {
      const html = `<!DOCTYPE html>
<html>
<head><title>Erreur d'authentification</title></head>
<body>
<script>
  try {
    window.opener.postMessage({
      type: 'GOOGLE_AUTH_ERROR',
      error: "Erreur lors de l'authentification"
    }, '${corsOrigin}');
    window.close();
  } catch (e) {
    document.body.innerHTML = '<p>Erreur lors de l\\'authentification. Vous pouvez fermer cette fenêtre.</p>';
  }
</script>
<p>Erreur lors de l'authentification...</p>
</body>
</html>`;

      res.send(html);
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: "Obtenir le profil de l'utilisateur connecté" })
  @ApiResponse({ status: 200, description: 'Profil utilisateur récupéré', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Token invalide ou expiré' })
  async getProfile(@Req() req: Request) {
    return req.user;
  }
}
