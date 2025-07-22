import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Nom complet de l\'utilisateur',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'URL de l\'avatar',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: 'Code ISO 639-1 de la langue native',
    example: 'fr',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z]{2}$/)
  nativeLanguage?: string;

  @ApiProperty({
    description: 'Code ISO 639-1 de la langue à apprendre',
    example: 'zh',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z]{2}$/)
  targetLanguage?: string;

  @ApiProperty({
    description: 'Fuseau horaire',
    example: 'Europe/Paris',
    required: false,
  })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({
    description: 'Préférences utilisateur en JSON',
    example: '{"theme": "dark", "notifications": true}',
    required: false,
  })
  @IsOptional()
  preferences?: any;
}
