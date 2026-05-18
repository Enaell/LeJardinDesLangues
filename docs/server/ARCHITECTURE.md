# Architecture Backend — Le Jardin des Langues

## 🏗️ Structure du projet

```
server/
├── prisma/
│   ├── schema.prisma          # Schéma de la base de données
│   ├── prisma.config.ts       # Configuration Prisma 7 (dotenv, adapter)
│   └── seed/                  # Seeds par domaine
│       ├── index.ts
│       ├── database.seed.ts
│       ├── users.seed.ts
│       ├── words.seed.ts
│       └── flashcards.seed.ts
└── src/
    ├── core/
    │   ├── prisma/            # PrismaModule + PrismaService
    │   └── redis/             # RedisModule + RedisService
    ├── modules/               # Modules fonctionnels métier
    │   ├── auth/
    │   ├── users/
    │   ├── dictionary/
    │   ├── flashcards/
    │   ├── exercises/
    │   └── community/
    ├── generated/prisma/      # Client Prisma généré (ne pas modifier)
    ├── app.module.ts
    └── main.ts
```

## 🎯 Modules fonctionnels

| Module | Description | Endpoints principaux |
|--------|-------------|---------------------|
| `auth` | Authentification JWT + OAuth Google | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/google` |
| `users` | Profils et préférences utilisateurs | `GET /users/me`, `PATCH /users/me` |
| `dictionary` | Recherche et consultation de mots | `GET /dictionary/search?q=`, `GET /dictionary/:id` |
| `flashcards` | Cartes mémoire et révisions | `GET /flashcards`, `POST /flashcards`, `PATCH /flashcards/:id`, `DELETE /flashcards/:id` |
| `exercises` | Exercices et gamification | `GET /exercises`, `POST /exercises/:id/submit` |
| `community` | Partage social et interactions | `GET /community/flashcards`, `POST /community/flashcards/:id/like` |

> Tous les endpoints sont préfixés par `/api/v1/`  
> Documentation Swagger disponible sur `/api/docs` (hors production)

## 🔐 Authentification

### Flux local (email + mot de passe)
1. `POST /api/v1/auth/register` — crée l'utilisateur, hash argon2id
2. `POST /api/v1/auth/login` — vérifie le hash, émet access token + refresh token
3. Tokens stockés en **httpOnly cookies** (non accessibles par JS)
4. Cookie `is_authenticated` non-httpOnly pour la détection côté client
5. `POST /api/v1/auth/refresh` — échange le refresh token contre un nouvel access token

### Flux OAuth (Google)
1. `GET /api/v1/auth/google` — redirection vers Google
2. Callback Google → création/mise à jour utilisateur
3. Émission des mêmes cookies JWT

### Durées
| Token | Durée | Stockage |
|-------|-------|----------|
| Access token | 15 min | httpOnly cookie |
| Refresh token | 7 jours | httpOnly cookie + hash en BDD |

## 📊 Modèle de données (résumé)

### Modèles principaux
- **User** : compte, préférences linguistiques, OAuth, rôle (USER/ADMIN/MODERATOR)
- **Word** : mot dans une langue (`languageCode`), avec `difficultyLevel`, `validated`
- **WordTranslation** : paire source/target entre deux mots
- **ExampleSentence** : phrase d'exemple liée à un mot
- **Flashcard** : carte d'un utilisateur reliant un mot source à un mot cible
- **FlashcardReview** : historique de révision (algorithme de répétition espacée)
- **FlashcardShare** : partage public d'une flashcard
- **FlashcardInteraction** : like, download, favorite, report
- **UserLanguageLevel** : niveau par langue par utilisateur

### Enums
`Role` · `Visibility` · `ValidationStatus` · `ShareType` · `InteractionType`

## 🔧 Configuration globale (`main.ts`)

- **Helmet** : headers de sécurité HTTP
- **CORS** : origine autorisée via `CORS_ORIGIN` (défaut : `http://localhost:5173`)
- **ValidationPipe** : `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- **Préfixe** : `api/v1`
- **Rate limiting** : ThrottlerModule (10 req/s courte, 100 req/min longue)
- **Cache** : mémoire en dev, Redis si `REDIS_URL` présent

## 🧪 Tests

| Type | Emplacement | Outils |
|------|-------------|--------|
| Unitaires | `src/**/*.spec.ts` | Jest, mocks Prisma |
| E2E | `test/**/*.e2e-spec.ts` | Jest, Supertest, Testcontainers PostgreSQL |
| Données de test | partout | Faker.js |

## 🛠️ Variables d'environnement clés

```bash
DATABASE_URL        # URL PostgreSQL
REDIS_URL           # URL Redis (optionnel en dev)
JWT_SECRET          # Secret pour signer les JWT
CORS_ORIGIN         # Origine CORS autorisée (défaut: http://localhost:5173)
GOOGLE_CLIENT_ID    # OAuth Google
GOOGLE_CLIENT_SECRET
NODE_ENV            # development | production
PORT                # Port du serveur (défaut: 3000)
```
