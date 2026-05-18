# Versions utilisées - Le Jardin des Langues

## 🔄 Mise à jour des versions (Juillet 2025)

### Node.js 22 LTS
- **Version** : Node.js 22.x
- **Type** : Long Term Support (LTS)
- **Support jusqu'à** : Avril 2027
- **Nouvelles fonctionnalités** :
  - Performance améliorée du moteur V8
  - Support natif amélioré des modules ES
  - Nouvelles APIs Web Standards
  - Meilleure gestion de la mémoire
  - Support des import maps natifs

### PostgreSQL 16
- **Version** : PostgreSQL 16.x
- **Sortie** : Septembre 2023
- **Support jusqu'à** : Novembre 2028
- **Nouvelles fonctionnalités importantes** :
  - **Parallélisation améliorée** : Requêtes plus rapides sur les gros datasets
  - **Optimisations des index** : Performance améliorée pour les recherches
  - **Amélioration des fonctions JSON/SQL** : Parfait pour notre dictionnaire
  - **Surveillance et monitoring** : Outils de diagnostic améliorés
  - **Réplication logique améliorée** : Scalabilité future

## 🆙 Montée de version majeure (Juillet 2026)

### Prisma 7
- **Version** : Prisma 7.x (`@prisma/client`, `prisma`, `@prisma/adapter-pg`)
- **Breaking changes gérés** :
  - Provider `prisma-client-js` → `prisma-client` avec `output` obligatoire
  - Client généré localement dans `src/generated/prisma` (plus dans `node_modules`)
  - Driver adapter **obligatoire** : `@prisma/adapter-pg` pour PostgreSQL
  - Variables d'env non chargées auto → `prisma.config.ts` avec `import 'dotenv/config'`
  - Flag `--skip-generate` supprimé de `prisma db push`
  - Seeding auto supprimé de `migrate dev` — `prisma db seed` doit être appelé explicitement
  - Middleware `$use` supprimé — remplacer par Client Extensions
  - Métriques preview supprimées

### TypeScript 6.0
- **Version** : TypeScript 6.x (client et server)
- **Breaking changes gérés** :
  - `"types"` défaut → `[]` — ajout explicite de `"types": ["node"]` dans le server tsconfig
  - `"rootDir"` défaut → `.` — ajout explicite de `"rootDir": "./src"` dans le server tsconfig
  - `"baseUrl"` déprécié — supprimé, paths mis à jour avec préfixe `./`
  - `"moduleResolution": "node"` déprécié → `"bundler"` (TS 6 autorise bundler + commonjs)
  - `"DOM.Iterable"` inclus dans `"DOM"` depuis TS 6 — supprimé de la lib client
  - `"strict": true` par défaut — les overrides explicites existants sont conservés

### Vite 8
- **Version** : Vite 8.x
- **Breaking changes gérés** :
  - Rolldown remplace Rollup comme bundler principal
  - Oxc remplace esbuild pour la transformation JS
  - Lightning CSS remplace esbuild pour la minification CSS
  - Target navigateur par défaut mis à jour (Chrome 111, Edge 111, Firefox 114, Safari 16.4)
  - Aucun `build.rollupOptions` ni option `esbuild` dans ce projet → migration transparente



### Authentification — httpOnly cookies + refresh tokens
- **Access token** : JWT 15 min stocké en cookie httpOnly (plus de localStorage)
- **Refresh token** : JWT 7 jours, hashé en Argon2id en base, httpOnly cookie
- **is_authenticated** : Cookie non-httpOnly lisible par le JS pour détecter la session
- **Rotation** : Le refresh token est invalidé et re-généré à chaque renouvellement
- **Détection de réutilisation** : Tentative de réutilisation d'un ancien refresh token → invalidation immédiate de la session

### Argon2id remplace bcrypt
- **Package** : `argon2` (remplace `bcryptjs`)
- **Algorithme** : Argon2id — résistant aux attaques GPU et side-channel
- **Utilisé pour** : hashage des mots de passe + hashage des refresh tokens en base

### IDs — cuid() remplace autoincrement
- **Type** : `String @id @default(cuid())` sur tous les modèles Prisma
- **Avantages** : Non-devinables, résistants à l'énumération, safe pour les URLs publiques

### Redis + CacheModule
- **Package serveur** : `ioredis`, `@nestjs/cache-manager`, `cache-manager`, `@keyv/redis`
- **RedisModule** : Module global NestJS exposant un client IoRedis (connexion lazy via `REDIS_URL`)
- **CacheModule** : Configuré globalement — mémoire en dev, Redis en production si `REDIS_URL` est défini

### Tests Frontend — Vitest
- **Package** : `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`
- **Config** : `client/vitest.config.ts` avec jsdom, globals, alias de chemin
- **Scripts** : `test:unit`, `test:unit:run`, `test:unit:coverage`
- Cypress reste pour les tests E2E

### Jest — version alignée
- `jest@^29.7.0` et `@types/jest@^29.5.0` (compatible avec `ts-jest@^29.1.0`)

## 🔄 Pipeline OpenAPI / génération de client TypeScript (Mai 2026)

### orval v8
- **Package client** : `orval@^8` (devDependency dans `client/`)
- **Rôle** : Génère des hooks TanStack Query + types TypeScript depuis le spec OpenAPI
- **Config** : `client/orval.config.ts` — mode `tags-split`, mutateur custom `apiClient.ts`
- **Commande** : `cd client && npm run generate:api`
- **Sortie** : `client/src/core/api/` (hooks par tag Swagger) + `client/src/core/api/model/` (types)

### @nestjs/swagger
- **Package serveur** : `@nestjs/swagger` (déjà présent)
- **Rôle** : Génère le spec OpenAPI 3.0 depuis les décorateurs NestJS
- **Décorateurs clés** : `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiProperty`, `@ApiBearerAuth`
- **UI** : Swagger UI sur `/api/docs` (hors production)

### ts-node + tsconfig-paths (génération serveur)
- **Packages** : `ts-node@^10.9.2`, `tsconfig-paths@^4.2.0` (devDependencies server)
- **Rôle** : Exécute `scripts/generate-openapi.ts` avec support `emitDecoratorMetadata` (requis par NestJS DI)
- **Pourquoi pas `tsx`** : esbuild (utilisé par tsx) ne supporte pas `emitDecoratorMetadata` → injection de dépendances NestJS cassée
- **Config dédiée** : `server/tsconfig.scripts.json` — étend `tsconfig.json` avec `rootDir: "."` pour les fichiers hors `src/`
- **Commande** : `cd server && npm run generate:openapi`

## 🎯 Avantages pour Le Jardin des Langues

### Performance
- **Recherche dans le dictionnaire** : PostgreSQL 16 améliore les performances des recherches textuelles
- **Gestion des flashcards** : Optimisations pour les requêtes complexes
- **API REST** : Node.js 22 offre de meilleures performances réseau
- **Cache Redis** : Réduction de la charge base de données pour les données fréquentes

### Développement
- **TypeScript** : Node.js 22 améliore le support des types natifs
- **Debugging** : Meilleurs outils de diagnostic
- **Hot reload** : Performance améliorée en développement
- **Tests unitaires** : Vitest + Testing Library pour les composants React

### Sécurité
- **Mises à jour de sécurité** : Versions récentes avec les derniers patches
- **Argon2id** : Algorithme de hashage moderne et résistant
- **httpOnly cookies** : Élimination du risque XSS sur les tokens JWT
- **Refresh token rotation** : Protection contre le vol de session

## 🔧 Compatibilité

### Frameworks supportés
- ✅ **NestJS 11** : Compatible avec Node.js 22
- ✅ **Prisma 7** : Support complet de PostgreSQL 16 — client ESM natif + driver adapter pg
- ✅ **React 19 / Vite 8** : Performance optimisée avec Rolldown + Oxc (remplace esbuild)
- ✅ **Material-UI 7 / Tailwind 4** : Aucun impact
- ✅ **Jest 29 / Cypress 14** : Tests fonctionnels
- ✅ **Vitest** : Tests unitaires frontend

### Images Docker
- **Base** : `node:22-alpine` (~120MB)
- **Database** : `postgres:16-alpine` (~85MB)
- **Avantages Alpine** : Images légères et sécurisées

## 🚀 Commandes de migration

```bash
# Reconstruire avec les nouvelles versions
make down
make clean
make build
make up

# Appliquer les changements de schéma Prisma (après modif schema.prisma)
docker-compose exec server npx prisma db push

# Vérifier les versions
docker-compose exec server node --version  # v22.x.x
docker-compose exec postgres psql --version  # 16.x
```

## 📝 Notes importantes

1. **Prisma** : Le client est régénéré automatiquement — IDs en `cuid()` depuis Mai 2026
2. **Variables d'environnement** : `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES_IN`, `REDIS_URL` à ajouter en production
3. **Performance** : Amélioration attendue de 10-20% sur les opérations de base
4. **Production** : Ces versions sont prêtes pour la production

---
*Dernière mise à jour : Juillet 2026*

