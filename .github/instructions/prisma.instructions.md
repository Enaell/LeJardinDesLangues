---
applyTo: "server/prisma/**"
---

# Conventions Prisma — Le Jardin des Langues

## Configuration (Prisma 7)
- **Generator** : `provider = "prisma-client"` (pas `prisma-client-js`)
- **Output** : `../src/generated/prisma` (client local, pas dans node_modules)
- **Driver adapter** : `@prisma/adapter-pg` obligatoire pour PostgreSQL
- **Config** : `prisma.config.ts` à la racine du serveur (avec `import 'dotenv/config'`)

## Conventions de nommage dans le schema
- **Modèles** : PascalCase (`User`, `Flashcard`, `WordTranslation`)
- **Champs** : camelCase en Prisma, `@map("snake_case")` pour la BDD
- **Tables** : `@@map("snake_case_plural")` (ex: `@@map("users")`, `@@map("flash_cards")`)
- **IDs** : `String @id @default(cuid())`
- **Timestamps** : `createdAt DateTime @default(now()) @map("created_at")` + `updatedAt DateTime @updatedAt @map("updated_at")`

## Modèles principaux

### User
Champs clés : `id`, `username`, `email`, `passwordHash` (nullable pour OAuth), `oauthProvider`, `oauthId`, `nativeLanguage`, `targetLanguage`, `role` (Role enum), `refreshTokenHash`, `refreshTokenExpiresAt`

### Word
Champs clés : `id`, `text`, `languageCode`, `partOfSpeech`, `difficultyLevel`, `validated`, `createdBy`  
Relations : `creator` (User), `sourceFlashcards`, `targetFlashcards`, `sourceTranslations`, `targetTranslations`, `exampleSentences`

### Flashcard
Champs clés : `id`, `userId`, `sourceWordId`, `targetWordId` (nullable), `notes`, `imageUrl`, `isPublic`  
Relations : `user`, `sourceWord`, `targetWord`, `reviews`, `interactions`, `shares`

## Enums
```prisma
enum Role { USER, ADMIN, MODERATOR }
enum Visibility { PRIVATE, PUBLIC, PENDING }
enum ValidationStatus { DRAFT, PENDING_REVIEW, APPROVED, REJECTED }
enum InteractionType { LIKE, DOWNLOAD, FAVORITE, REPORT }
```

## Workflows
```bash
# Après modification du schema
npx prisma generate          # Régénère le client TypeScript

# Nouvelle migration (dev)
npx prisma migrate dev --name <nom>

# Appliquer les migrations (prod/CI)
npx prisma migrate deploy

# Seed (doit être appelé explicitement — plus auto depuis Prisma 7)
npx prisma db seed

# Explorer les données
npx prisma studio
```

## Règles
- **Ne jamais** utiliser `$queryRaw` avec des interpolations de chaîne — risque SQL injection
- Toujours utiliser les paramètres Prisma : `prisma.$queryRaw\`SELECT * FROM users WHERE id = ${id}\``  
- Les seeds sont dans `prisma/seed/` (fichiers séparés par domaine)
- Le fichier de config est `prisma.config.ts` (à la racine `server/`)
