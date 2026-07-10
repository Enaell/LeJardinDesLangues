import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { Role } from '@/generated/prisma/client';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthUserDto } from './dto/oauth-user.dto';

export type JwtPayload = {
  sub: string;
  email: string;
  username: string;
  role: Role;
};

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: UserResponse;
  isNewUser?: boolean;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  private buildUserResponse(user: {
    id: string;
    username: string;
    email: string;
    name: string;
    role: Role;
    avatarUrl?: string | null;
    nativeLanguage: string;
    targetLanguage: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl ?? undefined,
      nativeLanguage: user.nativeLanguage,
      targetLanguage: user.targetLanguage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: (this.configService.get<string>('JWT_EXPIRES_IN') || '15m') as unknown as number,
    });
  }

  private generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d') as unknown as number,
    });
  }

  async generateTokenPair(payload: JwtPayload): Promise<TokenPair> {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    const refreshTokenHash = await argon2.hash(refreshToken, {
      type: argon2.argon2id,
    });

    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.parseDaysFromExpiry(refreshExpiresIn));

    await this.usersService.saveRefreshToken(payload.sub, refreshTokenHash, expiresAt);

    return { accessToken, refreshToken };
  }

  private parseDaysFromExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)d$/);
    return match ? parseInt(match[1], 10) : 7;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );

    if (existingUser) {
      throw new ConflictException("Email ou nom d'utilisateur déjà utilisé");
    }

    const passwordHash = await argon2.hash(registerDto.password, {
      type: argon2.argon2id,
    });

    const user = await this.usersService.create({
      ...registerDto,
      passwordHash,
    });

    return { user: this.buildUserResponse(user) };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmailOrUsername(
      loginDto.emailOrUsername,
      loginDto.emailOrUsername,
    );

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    await this.usersService.updateLastLogin(user.id);

    return { user: this.buildUserResponse(user) };
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<TokenPair> {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshTokenHash || !user.refreshTokenExpiresAt) {
      throw new ForbiddenException('Accès refusé');
    }

    if (new Date() > user.refreshTokenExpiresAt) {
      await this.usersService.clearRefreshToken(userId);
      throw new ForbiddenException('Session expirée, veuillez vous reconnecter');
    }

    const isTokenValid = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!isTokenValid) {
      // Possible tentative de réutilisation — invalider immédiatement la session
      await this.usersService.clearRefreshToken(userId);
      throw new ForbiddenException('Token invalide');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return this.generateTokenPair(payload);
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.clearRefreshToken(userId);
  }

  async validateOAuthUser(oauthUserDto: OAuthUserDto): Promise<AuthResponse> {
    let user = await this.usersService.findByOAuth(
      oauthUserDto.provider,
      oauthUserDto.providerId,
    );

    const isNewUser = !user;

    if (!user) {
      user = await this.usersService.createOAuthUser(oauthUserDto);
    } else {
      user = await this.usersService.updateOAuthUser(user.id, oauthUserDto);
    }

    await this.usersService.updateLastLogin(user.id);

    return { user: this.buildUserResponse(user), isNewUser };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Token invalide');
    }
    return user;
  }
}
