import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, AuthResponse } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Inscription d\'un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: 'object',
  })
  @ApiResponse({
    status: 409,
    description: 'Email ou nom d\'utilisateur déjà utilisé',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion d\'un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie',
    type: 'object',
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
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
    try {
      // L'utilisateur est attaché à req.user par la stratégie Google
      const authResponse = req.user as AuthResponse;

      // Créer une page HTML qui envoie les données à la fenêtre parent et se ferme
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentification réussie</title>
        </head>
        <body>
          <script>
            try {
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_SUCCESS',
                payload: ${JSON.stringify(authResponse)}
              }, '${process.env.FRONTEND_URL || 'http://localhost:5173'}');
              window.close();
            } catch (error) {
              console.error('Erreur lors de la communication avec la fenêtre parent:', error);
              document.body.innerHTML = '<p>Authentification réussie. Vous pouvez fermer cette fenêtre.</p>';
            }
          </script>
          <p>Authentification en cours...</p>
        </body>
        </html>
      `;

      res.send(html);
    } catch (error) {
      // En cas d'erreur, envoyer un message d'erreur à la popup
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Erreur d'authentification</title>
        </head>
        <body>
          <script>
            try {
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_ERROR',
                error: 'Erreur lors de l\'authentification'
              }, '${process.env.FRONTEND_URL || 'http://localhost:5173'}');
              window.close();
            } catch (error) {
              console.error('Erreur lors de la communication avec la fenêtre parent:', error);
              document.body.innerHTML = '<p>Erreur lors de l\\'authentification. Vous pouvez fermer cette fenêtre.</p>';
            }
          </script>
          <p>Erreur lors de l'authentification...</p>
        </body>
        </html>
      `;

      res.send(html);
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obtenir le profil de l\'utilisateur connecté' })
  @ApiResponse({
    status: 200,
    description: 'Profil utilisateur récupéré',
  })
  @ApiResponse({
    status: 401,
    description: 'Token invalide ou expiré',
  })
  async getProfile(@Req() req: Request) {
    return req.user;
  }
}
