import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email ou nom d\'utilisateur',
    example: 'john.doe@example.com',
  })
  @IsString()
  emailOrUsername: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'MonMotDePasse123!',
  })
  @IsString()
  @MinLength(1, { message: 'Le mot de passe est requis' })
  password: string;
}
