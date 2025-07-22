import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { CommunityModule } from './modules/community/community.module';
import * as path from 'path';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Internationalisation
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    // Modules core
    PrismaModule,

    // Modules fonctionnels
    AuthModule,
    UsersModule,
    DictionaryModule,
    FlashcardsModule,
    ExercisesModule,
    CommunityModule,
  ],
})
export class AppModule { }
