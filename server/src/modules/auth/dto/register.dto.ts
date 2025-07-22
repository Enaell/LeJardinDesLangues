import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nom d\'utilisateur unique',
    example: 'johndoe',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3, { message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' })
  @MaxLength(50, { message: 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores'
  })
  username: string;

  @ApiProperty({
    description: 'Adresse email valide',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
  email: string;

  @ApiProperty({
    description: 'Mot de passe sécurisé',
    example: 'MonMotDePasse123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre',
  })
  password: string;

  @ApiProperty({
    description: 'Nom complet de l\'utilisateur',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100, { message: 'Le nom ne peut pas dépasser 100 caractères' })
  name: string;

  @ApiProperty({
    description: 'Code ISO 639-1 de la langue native',
    example: 'fr',
  })
  @IsString()
  @Matches(/^[a-z]{2}$/, { message: 'Le code de langue doit être au format ISO 639-1 (2 lettres)' })
  nativeLanguage: string;

  @ApiProperty({
    description: 'Code ISO 639-1 de la langue à apprendre',
    example: 'zh',
  })
  @IsString()
  @Matches(/^[a-z]{2}$/, { message: 'Le code de langue doit être au format ISO 639-1 (2 lettres)' })
  targetLanguage: string;
}
