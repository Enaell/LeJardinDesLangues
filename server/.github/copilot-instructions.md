<SYSTEM>
You are an AI programming assistant specialized in applying code changes to existing or new documents.
Follow Microsoft content policies.
Avoid content that violates copyrights.
If you are asked to generate content that is harmful, hateful, racist, sexist, lewd, or violent, only respond with "Sorry, I can't assist with that."
Keep your answers short and impersonal.

When provided with a code block and an instructions file, follow these steps:
1. Analyze the code block and the existing document to decide if the code block should replace existing code or be inserted.
2. If necessary, break up the code block into multiple parts and insert each part at the appropriate location.
3. Preserve whitespace and newlines right after the parts of the file that you modify.
4. Ensure the final result is syntactically valid, properly formatted, and correctly indented. Do not include `...existing code...` comments.
5. Provide the fully rewritten file as the final output.
</SYSTEM>

# Le Jardin des Langues - Backend Server

**Le Jardin des Langues** est une application web d'apprentissage des langues, spécialisée dans le chinois et le français. Le backend fournit une API REST robuste développée avec NestJS et TypeScript.

## 🎯 Contexte du projet

### Vision globale
- **API REST complète** pour l'apprentissage des langues
- **Dictionnaire français-chinois** avec recherche avancée
- **Système de flashcards** avec synchronisation multi-utilisateurs
- **Gamification** avec exercices et suivi de progression
- **Communauté sociale** avec partage et interactions
- **Authentification sécurisée** JWT et OAuth 2.0

### Clients Frontend
Le backend expose une API REST consommée par :
- **Client web React** (application principale)
- **Application mobile React Native** (développement futur)
- **Interfaces tierces** via API publique

---

## 🧱 Stack technique Backend

### Core Technologies
- **NestJS** - Framework Node.js progressif et modulaire
- **TypeScript** - Typage statique pour JavaScript
- **Node.js 22** - Runtime JavaScript moderne
- **Prisma** - ORM moderne et type-safe pour PostgreSQL

### Base de données
- **PostgreSQL 16** - Base de données relationnelle principale
- **Prisma** - ORM avec migrations automatiques et type-safety
- **Redis** - Cache et sessions (production)

### Authentification & Sécurité
- **JWT** - Access token (15 min, httpOnly cookie) + Refresh token (7 jours, httpOnly cookie)
- **Passport.js** - Middleware d'authentification
- **OAuth 2.0** - Intégration Google, Facebook
- **Argon2id** - Hashage sécurisé des mots de passe (via argon2)
- **cookie-parser** - Lecture des cookies httpOnly côté serveur

### Documentation & Testing
- **Swagger/OpenAPI** - Documentation API automatique
- **Jest** - Framework de test unitaire et d'intégration
- **Testcontainers** - Tests avec base de données Docker
- **Faker.js** - Génération de données de test

---

## 🏗️ Architecture Backend

### Structure modulaire NestJS

```
src/
├── core/              # 🔧 Modules centraux et configuration
│   ├── database/     # Configuration Prisma et base de données
│   ├── auth/         # Guards, strategies et décorateurs
│   ├── config/       # Configuration environment et validation
│   ├── filters/      # Exception filters globaux
│   ├── interceptors/ # Intercepteurs (logging, transform)
│   └── pipes/        # Pipes de validation globaux
├── modules/          # 🎯 Modules fonctionnels métier
│   ├── auth/         # Authentification et autorisation
│   ├── users/        # Gestion des utilisateurs
│   ├── dictionary/   # Dictionnaire et recherche
│   ├── flashcards/   # Cartes flash et decks
│   ├── exercises/    # Exercices et gamification
│   └── community/    # Fonctionnalités sociales
├── common/           # 🛠️ Utilitaires et types partagés
│   ├── decorators/   # Décorateurs personnalisés
│   ├── dto/          # DTOs de base et validations
│   ├── enums/        # Énumérations partagées
│   ├── interfaces/   # Interfaces communes
│   └── utils/        # Fonctions utilitaires
├── app.module.ts    # Module principal de l'application
└── main.ts          # Point d'entrée et bootstrap
```

### Organisation des modules métier
Chaque module suit la structure NestJS standard :
- `*.controller.ts` - Contrôleurs REST avec endpoints
- `*.service.ts` - Logique métier et business rules
- `*.repository.ts` - Couche d'accès aux données (Prisma)
- `dto/` - Data Transfer Objects avec validation
- `entities/` - Entités Prisma générées
- `*.module.ts` - Configuration et injection de dépendances

---

## 📊 Modèle de données avec Prisma

### Schéma de base de données

```prisma
// Utilisateurs et authentification
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String?  // Null pour OAuth users
  provider  AuthProvider @default(LOCAL)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  flashcards    Flashcard[]
  reviews       FlashcardReview[]
  interactions  FlashcardInteraction[]
  languageLevels UserLanguageLevel[]
}

// Dictionnaire et mots
model Word {
  id           String @id @default(cuid())
  french       String
  chinese      String
  pronunciation String?
  difficulty   Int    @default(1)
  
  // Relations
  translations   WordTranslation[]
  examples       ExampleSentence[]
  flashcards     Flashcard[]
}

// Flashcards et apprentissage
model Flashcard {
  id          String @id @default(cuid())
  userId      String
  wordId      String
  notes       String?
  imageUrl    String?
  isPublic    Boolean @default(false)
  createdAt   DateTime @default(now())
  
  // Relations
  user         User @relation(fields: [userId], references: [id])
  word         Word @relation(fields: [wordId], references: [id])
  reviews      FlashcardReview[]
  interactions FlashcardInteraction[]
}
```

### Migrations et seeds
- **Migrations** automatiques avec Prisma
- **Seeds** pour données de base (mots du dictionnaire)
- **Indexes** optimisés pour les recherches
- **Contraintes** de base de données pour l'intégrité

---

## 📝 Conventions de codage Backend

### Modules NestJS
- **Structure modulaire** : Un module par domaine métier
- **Injection de dépendances** : Utiliser les décorateurs NestJS
- **Séparation des responsabilités** : Controller → Service → Repository

### Controllers REST
```typescript
@Controller('dictionary')
@ApiTags('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search words in dictionary' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  async searchWords(@Query('q') query: string): Promise<WordDto[]> {
    return this.dictionaryService.searchWords(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Word ID' })
  async getWord(@Param('id') id: string): Promise<WordDto> {
    return this.dictionaryService.getWordById(id);
  }
}
```

### Services et logique métier
```typescript
@Injectable()
export class DictionaryService {
  constructor(
    private readonly dictionaryRepository: DictionaryRepository,
    private readonly logger: Logger,
  ) {}

  async searchWords(query: string): Promise<WordDto[]> {
    this.logger.log(`Searching words with query: ${query}`);
    
    const words = await this.dictionaryRepository.searchWords(query);
    return words.map(word => this.mapToDto(word));
  }
}
```

### DTOs et validation
```typescript
export class CreateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Word ID to create flashcard from' })
  wordId: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty({ description: 'Personal notes for this flashcard', required: false })
  notes?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({ description: 'Image URL for visual learning', required: false })
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Whether this flashcard is public', default: false })
  isPublic?: boolean = false;
}
```

### Repositories avec Prisma
```typescript
@Injectable()
export class DictionaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchWords(query: string): Promise<Word[]> {
    return this.prisma.word.findMany({
      where: {
        OR: [
          { french: { contains: query, mode: 'insensitive' } },
          { chinese: { contains: query } },
        ],
      },
      include: {
        translations: true,
        examples: true,
      },
      take: 50,
    });
  }

  async findById(id: string): Promise<Word | null> {
    return this.prisma.word.findUnique({
      where: { id },
      include: {
        translations: true,
        examples: true,
        flashcards: {
          where: { isPublic: true },
          take: 5,
        },
      },
    });
  }
}
```

---

## 🔐 Authentification et sécurité

### Stratégies d'authentification
```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}

// OAuth Google Strategy
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }
}
```

### Guards et décorateurs
```typescript
// Custom decorator pour obtenir l'utilisateur actuel
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Utilisation dans un controller
@UseGuards(JwtAuthGuard)
@Post('flashcards')
async createFlashcard(
  @CurrentUser() user: UserPayload,
  @Body() createFlashcardDto: CreateFlashcardDto,
): Promise<FlashcardDto> {
  return this.flashcardsService.createFlashcard(user.userId, createFlashcardDto);
}
```

### Validation et sécurité
- **ValidationPipe** global avec whitelist
- **Rate limiting** pour prévenir les abus
- **CORS** configuré pour les domaines autorisés
- **Helmet** pour les headers de sécurité

---

## 📊 API REST et documentation

### Structure des endpoints
```
/api/v1/
├── auth/
│   ├── POST /login          # Authentification locale
│   ├── POST /register       # Inscription
│   ├── POST /refresh        # Refresh token
│   ├── GET  /google         # OAuth Google
│   └── POST /logout         # Déconnexion
├── dictionary/
│   ├── GET    /search       # Recherche de mots
│   ├── GET    /:id          # Détail d'un mot
│   └── GET    /random       # Mot aléatoire
├── flashcards/
│   ├── GET    /             # Liste des flashcards utilisateur
│   ├── POST   /             # Créer une flashcard
│   ├── PUT    /:id          # Modifier une flashcard
│   ├── DELETE /:id          # Supprimer une flashcard
│   └── POST   /:id/review   # Marquer comme révisée
├── exercises/
│   ├── GET    /types        # Types d'exercices disponibles
│   ├── GET    /:type        # Exercices d'un type
│   └── POST   /:id/submit   # Soumettre une réponse
└── community/
    ├── GET    /flashcards   # Flashcards publiques
    ├── POST   /:id/like     # Liker une flashcard
    └── POST   /:id/comment  # Commenter une flashcard
```

### Documentation Swagger
- **OpenAPI 3.0** avec décorateurs NestJS
- **Exemples** de requêtes et réponses
- **Schémas** générés automatiquement depuis les DTOs
- **Authentification** documentée (Bearer Token)

---

## 🧪 Tests Backend

### Tests unitaires avec Jest
```typescript
describe('DictionaryService', () => {
  let service: DictionaryService;
  let repository: DictionaryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DictionaryService,
        {
          provide: DictionaryRepository,
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
    repository = module.get<DictionaryRepository>(DictionaryRepository);
  });

  it('should search words successfully', async () => {
    const mockWords = [createMockWord()];
    jest.spyOn(repository, 'searchWords').mockResolvedValue(mockWords);

    const result = await service.searchWords('hello');

    expect(result).toHaveLength(1);
    expect(repository.searchWords).toHaveBeenCalledWith('hello');
  });
});
```

### Tests d'intégration avec Testcontainers
```typescript
describe('DictionaryController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    // Démarrer un conteneur PostgreSQL de test
    const container = await new PostgreSqlContainer()
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(createTestPrismaService(container.getConnectionUri()))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/dictionary/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/dictionary/search?q=hello')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});
```

### Génération de données de test
```typescript
// factories/word.factory.ts
export const createMockWord = (overrides?: Partial<Word>): Word => ({
  id: faker.string.cuid(),
  french: faker.lorem.word(),
  chinese: faker.lorem.word(),
  pronunciation: faker.lorem.word(),
  difficulty: faker.number.int({ min: 1, max: 5 }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
});
```

---

## 🔧 Configuration et environnement

### Variables d'environnement
```bash
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/lejardin_dev"
REDIS_URL="redis://localhost:6379"

# Authentification
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Configuration générale
NODE_ENV="development"
PORT=3000
API_PREFIX="api/v1"

# Internationalisation
DEFAULT_LANGUAGE="fr"
AVAILABLE_LANGUAGES="fr,en,zh"
```

### Configuration Prisma
```typescript
// core/database/prisma.service.ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    await this.$connect();
    this.logger.log('Connected to database successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

## 🚀 Déploiement et production

### Configuration Docker
```dockerfile
# Dockerfile multi-stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
USER node
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Health checks et monitoring
```typescript
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  async check(): Promise<HealthCheckResult> {
    return {
      status: 'ok',
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

## 🛠️ Commandes utiles

```bash
# Développement
npm run start:dev        # Démarrer en mode développement avec hot reload
npm run start:debug      # Démarrer avec debugger
npm run build           # Build de production

# Base de données
npx prisma migrate dev   # Créer et appliquer une migration
npx prisma generate     # Générer le client Prisma
npx prisma studio       # Interface graphique pour la DB
npx prisma seed         # Exécuter les seeds

# Tests
npm run test            # Tests unitaires
npm run test:e2e        # Tests d'intégration
npm run test:cov        # Couverture de code

# Code quality
npm run lint            # Linter ESLint
npm run format          # Formatter Prettier
```

---

## 💡 Bonnes pratiques Backend

### Performance
- **Connection pooling** avec Prisma
- **Caching** avec Redis pour les requêtes fréquentes
- **Pagination** pour les listes importantes
- **Indexes** de base de données optimisés

### Sécurité
- **Validation** stricte des inputs avec class-validator
- **Rate limiting** par IP et par utilisateur
- **HTTPS** obligatoire en production
- **Secrets** gérés via variables d'environnement

### Monitoring et logs
- **Structured logging** avec Winston
- **Health checks** pour le monitoring
- **Metrics** d'application (response time, error rate)
- **Distributed tracing** pour le debugging

### Scalabilité
- **Architecture modulaire** prête pour les microservices
- **Stateless** design avec JWT
- **Load balancing** ready
- **Database sharding** préparé dans le schema
