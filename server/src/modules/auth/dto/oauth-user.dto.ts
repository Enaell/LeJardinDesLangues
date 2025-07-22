import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';

export class OAuthUserDto {
  @IsString()
  provider: string; // 'google', 'facebook', etc.

  @IsString()
  providerId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsString()
  @Matches(/^[a-z]{2}$/)
  nativeLanguage: string;

  @IsString()
  @Matches(/^[a-z]{2}$/)
  targetLanguage: string;
}
