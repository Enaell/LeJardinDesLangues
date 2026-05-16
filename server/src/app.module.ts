import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './core/prisma/prisma.module';
import { RedisModule } from './core/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { CommunityModule } from './modules/community/community.module';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Modules core
    PrismaModule,
    RedisModule,

    // Cache (mémoire en dev, Redis en prod si REDIS_URL est défini)
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (redisUrl) {
          const { createKeyv } = await import('@keyv/redis');
          return { stores: [createKeyv(redisUrl)], ttl: 60_000 };
        }
        return { ttl: 60_000 };
      },
    }),

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
