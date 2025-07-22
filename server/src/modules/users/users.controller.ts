import { Controller, Get, Put, Delete, Body, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';

@ApiTags('Utilisateurs')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  @ApiOperation({ summary: 'Obtenir son profil utilisateur' })
  @ApiResponse({ status: 200, description: 'Profil utilisateur récupéré' })
  async getMyProfile(@Req() req: Request) {
    const user = req.user as any;
    return this.usersService.findById(user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Mettre à jour son profil' })
  @ApiResponse({ status: 200, description: 'Profil mis à jour avec succès' })
  async updateMyProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const user = req.user as any;
    return this.usersService.updateProfile(user.id, updateProfileDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un profil utilisateur public' })
  @ApiResponse({ status: 200, description: 'Profil utilisateur récupéré' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Retourner seulement les informations publiques
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Supprimer son compte' })
  @ApiResponse({ status: 200, description: 'Compte supprimé avec succès' })
  async deleteMyAccount(@Req() req: Request) {
    const user = req.user as any;
    await this.usersService.deleteUser(user.id);
    return { message: 'Compte supprimé avec succès' };
  }
}
