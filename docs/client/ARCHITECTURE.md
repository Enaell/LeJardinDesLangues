# Architecture Frontend - Le Jardin des Langues

## 🏗️ Structure du projet

Cette application utilise une architecture **orientée fonctionnalités** (feature-oriented) qui organise le code autour des fonctionnalités métier plutôt que par type de fichier.

### 📁 Organisation des dossiers

```
src/
├── features/           # 🎯 Fonctionnalités métier
│   ├── auth/          # Authentification et autorisation
│   ├── landing/       # Landing page publique (hero, sections marketing)
│   ├── dictionary/    # Recherche et consultation du dictionnaire
│   ├── flashcards/    # Gestion et étude des cartes mémoire
│   ├── exercises/     # Exercices et jeux d'apprentissage
│   ├── community/     # Fonctionnalités sociales et communautaires
│   └── profile/       # Gestion du profil utilisateur
├── core/              # 🔧 Code partagé et fondations
│   ├── api/           # 🤖 Client API généré (orval — ne pas modifier manuellement)
│   │   ├── authentification/
│   │   ├── dictionnaire/
│   │   ├── flashcards/
│   │   ├── utilisateurs/
│   │   ├── model/     # Types TypeScript générés depuis les DTOs NestJS
│   │   └── index.ts
│   ├── components/    # Composants UI réutilisables
│   │   ├── layout/    # Composants de mise en page (AppBar, Footer)
│   │   └── notifications/ # Système toast
│   ├── hooks/         # Hooks personnalisés partagés
│   ├── services/      # Services et configuration API
│   │   ├── queryClient.ts  # QueryClient global TanStack Query
│   │   └── apiClient.ts    # Mutateur fetch custom (utilisé par orval)
│   ├── utils/         # Fonctions utilitaires
│   ├── types/         # Types TypeScript globaux
│   └── i18n/          # Configuration et traductions
├── components/ui/     # Composants shadcn/ui générés (ne pas modifier)
├── lib/               # Utilitaires shadcn (cn())
└── routes/            # 🛣️ Configuration du routage (TanStack Router)
```

## 🎯 Features (Fonctionnalités)

Chaque feature est un module autonome contenant :

```
features/example/
├── components/        # Composants spécifiques à la feature
│   ├── ExampleForm.tsx
│   ├── ExampleList.tsx
│   └── index.ts      # Exports publics des composants
├── hooks/            # Hooks métier de la feature
│   ├── useExample.ts
│   └── index.ts      # Exports des hooks
├── services/         # Services API spécifiques
│   ├── exampleApi.ts
│   └── index.ts      # Exports des services
├── types/            # Types TypeScript de la feature
│   └── index.ts      # Exports des types
└── index.ts          # Exports publics de toute la feature
```

### 📋 Features disponibles

| Feature | Description | Statut |
|---------|-------------|--------|
| `auth` | Authentification, connexion, inscription | 🚧 En développement |
| `landing` | Landing page publique (hero, sections marketing) | 🚧 En développement |
| `dictionary` | Recherche de mots, définitions, traductions | 🚧 En développement |
| `flashcards` | Création et étude de cartes mémoire | 🚧 En développement |
| `exercises` | Exercices interactifs d'apprentissage | 🚧 En développement |
| `community` | Partage, discussions, profils publics | 🚧 En développement |
| `profile` | Gestion du profil et préférences utilisateur | 🚧 En développement |

## 🔧 Core (Fondations)

Le dossier `core` contient tous les éléments partagés entre les features :

### 🎨 Components
- **`layout/`** : Composants de mise en page (`Layout`, `AppBar`, `Footer`) — Tailwind pur
  - `AppBar` : bascule automatiquement entre deux modes selon la route :
    - **mode landing** (`/`) : `absolute`, transparent, blanc, `AppBarLandingNav` + `AppBarLandingNavMobile`
    - **mode app** (autres routes) : `sticky`, fond `bg-primary`, `AppBarDesktop` + `AppBarMobile`
  - `AppBarLandingNav` / `AppBarLandingNavMobile` : liens scroll-to-section (`#features`, `#languages`, `#about`, `#team`) + bouton CTA
  - `AppBarDesktop` / `AppBarMobile` : navigation entre modules de l'app (Dictionary, Flashcards, Exercises, Community)
- **`notifications/`** : Système de notifications toast (`NotificationProvider`, `GlobalNotifications`, `useNotify`)
- **`ui/`** : Composants UI (shadcn/base-ui + custom) dans `src/core/components/ui/` — voir `docs/client/THEME.md` pour la liste complète

### 📖 Storybook

Chaque composant de `core/components/ui/` a une story dans `client/.storybook/stories/`.

```
client/
└── .storybook/
    ├── main.ts          ← config (glob: ./stories/**)
    ├── preview.tsx      ← import index.css + backgrounds garden
    └── stories/
        ├── button.stories.tsx
        ├── level-badge.stories.tsx
        └── ...             ← 22 stories au total
```

Lancer : `cd client && npm run storybook`

> Règle : tout nouveau composant ajouté dans `core/components/ui/` doit avoir sa story.

### 🪝 Hooks
Hooks personnalisés partagés :
- `useTranslation` : Raccourci i18n
- `useImageCache` : Cache d'images
- `useNotify` : Notifications toast

### ⚙️ Services
- **`queryClient.ts`** : Configuration TanStack Query (`QueryClient` global)
- **`apiClient.ts`** : Mutateur fetch custom pour orval — gère `credentials: 'include'`, les erreurs typées, les réponses 204, et un **intercepteur 401 → refresh automatique** (tente `POST /auth/refresh` avec le cookie httpOnly avant de propager l'erreur)

### 🤖 API généré (`core/api/`)
Hooks TanStack Query et types TypeScript **auto-générés** depuis le spec OpenAPI du serveur via **orval**.

> ⚠️ Ne pas modifier ces fichiers manuellement — les regénérer avec `npm run generate:api`

| Dossier | Hooks générés |
|---------|---------------|
| `authentification/` | `useAuthControllerRegister`, `useAuthControllerLogin`, `useAuthControllerLogout`, `useAuthControllerRefresh`, etc. |
| `dictionnaire/` | `useDictionnaireControllerSearch`, etc. |
| `flashcards/` | `useFlashcardsControllerFindAll`, `useFlashcardsControllerCreate`, etc. |
| `utilisateurs/` | `useUsersControllerGetMe`, `useUsersControllerUpdateMe`, etc. |
| `model/` | `AuthResponseDto`, `LoginDto`, `RegisterDto`, `UserResponseDto`, etc. |

#### Commande de régénération
```bash
# Depuis la racine du projet (requiert la DB)
make generate-api

# Ou étape par étape :
cd server && npm run generate:openapi   # → openapi.json à la racine
cd client && npm run generate:api       # → src/core/api/
```

#### Utilisation des hooks générés
```typescript
import { useAuthControllerLogin } from '@core/api/authentification/authentification';
import type { LoginDto } from '@core/api/model';

const loginMutation = useAuthControllerLogin();
loginMutation.mutate({ emailOrUsername, password } satisfies LoginDto);
```

> En pratique, les features wrappent ces hooks dans leurs propres hooks métier (`useLogin`, `useAuth`…) pour y ajouter la gestion du cache, les notifications et la navigation.

### 🛠️ Utils
Fonctions utilitaires :
- **Formatters** : Formatage de dates, nombres, etc.
- **Validators** : Validation de formulaires
- **Constants** : Constantes de l'application

### 🌍 i18n
- **Config** : Configuration de l'internationalisation
- **Locales** : Fichiers de traduction (fr, en, zh) — clés organisées par domaine : `app`, `navigation`, `landing`, `features`, `auth`, `common`, `errors`

### 🗺️ routes.config.ts

Fichier central de configuration de la navigation (`src/core/routes.config.ts`) :

```typescript
// Constantes de routes
export const ROUTES = { HOME, DICTIONARY, FLASHCARDS, EXERCISES, COMMUNITY, PROFILE };

// Items pour la navigation in-app (mode "app")
export type NavigationItem = { path, icon, translationKey };
export const APP_NAV_ITEMS: NavigationItem[];   // Dictionary, Flashcards, Exercises, Community

// Items pour la landing page (scroll vers sections)
export type LandingNavItem = { sectionId, translationKey };
export const LANDING_NAV_ITEMS: LandingNavItem[]; // #features, #languages, #about, #team
```

## 📝 Conventions de nommage

### Fichiers et dossiers
- **Dossiers** : kebab-case (`flash-cards`, `user-profile`)
- **Composants** : PascalCase (`UserProfile.tsx`, `FlashCard.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useAuth.ts`, `useFlashcards.ts`)
- **Services** : camelCase avec suffixe `Api` (`dictionaryApi.ts`)
- **Types** : PascalCase (`User.ts`, `FlashCard.ts`)

### Exports
- Chaque dossier contient un `index.ts` pour centraliser les exports
- Les features exportent uniquement leur API publique
- Les composants core sont exportés individuellement

## 🚀 Utilisation

### Import d'une feature complète
```typescript
import { LoginForm, useAuth } from '@/features/auth';
```

### Import du core
```typescript
import { useNotify, useTranslation } from '@core/hooks';
import { Layout } from '@core/components/layout';
// Composants UI (shadcn/ui + custom)
import { Button } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { LevelBadge } from '@core/components/ui/level-badge';
import { StarRating } from '@core/components/ui/star-rating';
import { Stepper } from '@core/components/ui/stepper';
import { SearchInput } from '@core/components/ui/search-input';
```


## 🔄 Migration et évolution

Cette architecture permet :
- ✅ **Scalabilité** : Ajout facile de nouvelles features
- ✅ **Maintenance** : Code organisé et localisé
- ✅ **Réutilisabilité** : Composants core partagés
- ✅ **Tests** : Tests isolés par feature
- ✅ **Collaboration** : Équipes peuvent travailler sur des features différentes

## 📚 Ressources

- [Feature-Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
- [React Architecture Best Practices](https://blog.bitsrc.io/how-to-structure-react-project-like-a-pro-ea1cf5c8e378)
- [TypeScript Project Structure](https://khalilstemmler.com/articles/typescript-domain-driven-design/ddd-frontend/)
