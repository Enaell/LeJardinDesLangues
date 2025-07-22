import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterDto } from '../auth/dto/register.dto';
import { OAuthUserDto } from '../auth/dto/oauth-user.dto';

export type CreateUserData = RegisterDto & {
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(userData: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        passwordHash: userData.passwordHash,
        name: userData.name,
        nativeLanguage: userData.nativeLanguage,
        targetLanguage: userData.targetLanguage,
      },
    });
  }

  async createOAuthUser(oauthUserDto: OAuthUserDto): Promise<User> {
    // Générer un username unique basé sur l'email
    const baseUsername = oauthUserDto.email.split('@')[0];
    let username = baseUsername;
    let counter = 1;

    // Vérifier l'unicité du username
    while (await this.findByUsername(username)) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return this.prisma.user.create({
      data: {
        username,
        email: oauthUserDto.email,
        name: oauthUserDto.name,
        avatarUrl: oauthUserDto.avatarUrl,
        nativeLanguage: oauthUserDto.nativeLanguage,
        targetLanguage: oauthUserDto.targetLanguage,
        oauthProvider: oauthUserDto.provider,
        oauthId: oauthUserDto.providerId,
      },
    });
  }

  async updateOAuthUser(userId: number, oauthUserDto: OAuthUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: oauthUserDto.name,
        avatarUrl: oauthUserDto.avatarUrl,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });
  }

  async findByOAuth(provider: string, providerId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        oauthProvider: provider,
        oauthId: providerId,
      },
    });
  }

  async updateLastLogin(userId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async updateProfile(userId: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
