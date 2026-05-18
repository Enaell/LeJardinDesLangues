---
applyTo: "server/src/**"
---

# Conventions Backend — Le Jardin des Langues

## Stack
- Node.js 22 + NestJS 11 + TypeScript
- **ORM** : Prisma 7 — client généré dans `src/generated/prisma`, driver `@prisma/adapter-pg`
- **BDD** : PostgreSQL 16
- **Auth** : JWT (`@nestjs/jwt`) + OAuth 2.0 (Passport.js) + argon2id (hashage)
- **Cache** : `@nestjs/cache-manager` (mémoire en dev, Redis si `REDIS_URL` défini)
- **API** : REST, préfixe global `api/v1`, Swagger sur `/api/docs` (hors prod)

## Structure des modules
```
src/
├── core/
│   ├── prisma/    ← PrismaModule + PrismaService (injecter via constructor)
│   └── redis/     ← RedisModule + RedisService
└── modules/
    ├── auth/      ← JWT guards, strategies (jwt.strategy.ts, google.strategy.ts), DTO
    ├── users/     ← CRUD utilisateurs
    ├── dictionary/← Recherche de mots (Word, WordTranslation, ExampleSentence)
    ├── flashcards/← Decks et cartes (Flashcard, FlashcardReview, FlashcardShare)
    ├── exercises/ ← Exercices et gamification
    └── community/ ← Partage social, interactions
```

Chaque module = `*.module.ts` + `*.controller.ts` + `*.service.ts` + `dto/`  
**Pas de couche Repository** — les services injectent `PrismaService` directement.

## Injection Prisma
```typescript
@Injectable()
export class MyService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

## DTOs et validation (OBLIGATOIRE sur tous les endpoints)
```typescript
import { IsString, IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  username: string;
}
```

## Authentification
- **Access token** : JWT 15 min, httpOnly cookie
- **Refresh token** : JWT 7 jours, httpOnly cookie
- Cookie `is_authenticated` non-httpOnly (lisible JS client)
- Hashage : argon2id **uniquement** (`argon2` package) — jamais bcrypt/md5/sha1

## Sécurité (OWASP — non négociable)
- `ValidationPipe` global avec `whitelist: true, forbidNonWhitelisted: true`
- Ne **jamais** exposer `passwordHash` ou `refreshTokenHash` dans les réponses
- Toujours paramétrer les requêtes Prisma (pas de raw SQL non paramétré)
- Guards NestJS sur toutes les routes protégées

## Commandes utiles
```bash
npm run start:dev         # hot reload
npx prisma generate       # après modification du schema
npx prisma migrate dev    # nouvelle migration
npm run test              # tests unitaires Jest
npm run test:e2e          # tests e2e
```
