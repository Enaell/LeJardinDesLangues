import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthUserDto } from './dto/oauth-user.dto';
import * as bcryptjs from 'bcryptjs';

export type JwtPayload = {
  sub: number;
  email: string;
  username: string;
  role: string;
};

export type AuthResponse = {
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
    avatarUrl?: string;
  };
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Vérifier si l'email ou username existe déjà
    const existingUser = await this.usersService.findByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );

    if (existingUser) {
      throw new ConflictException('Email ou nom d\'utilisateur déjà utilisé');
    }

    // Hasher le mot de passe
    const saltRounds = 12;
    const passwordHash = await bcryptjs.hash(registerDto.password, saltRounds);

    // Créer l'utilisateur
    const user = await this.usersService.create({
      ...registerDto,
      passwordHash,
    });

    // Générer le token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Trouver l'utilisateur par email ou username
    const user = await this.usersService.findByEmailOrUsername(
      loginDto.emailOrUsername,
      loginDto.emailOrUsername,
    );

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Mettre à jour la dernière connexion
    await this.usersService.updateLastLogin(user.id);

    // Générer le token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
    };
  }

  async validateOAuthUser(oauthUserDto: OAuthUserDto): Promise<AuthResponse> {
    // Chercher un utilisateur existant avec ce provider et cet ID
    let user = await this.usersService.findByOAuth(
      oauthUserDto.provider,
      oauthUserDto.providerId,
    );

    if (!user) {
      // Créer un nouvel utilisateur OAuth
      user = await this.usersService.createOAuthUser(oauthUserDto);
    } else {
      // Mettre à jour les informations de l'utilisateur existant
      user = await this.usersService.updateOAuthUser(user.id, oauthUserDto);
    }

    // Mettre à jour la dernière connexion
    await this.usersService.updateLastLogin(user.id);

    // Générer le token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Token invalide');
    }
    return user;
  }
}
