# Architecture Frontend - Le Jardin des Langues

## 🏗️ Structure du projet

Cette application utilise une architecture **orientée fonctionnalités** (feature-oriented) qui organise le code autour des fonctionnalités métier plutôt que par type de fichier.

### 📁 Organisation des dossiers

```
src/
├── features/           # 🎯 Fonctionnalités métier
│   ├── auth/          # Authentification et autorisation
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
├── routes/            # 🛣️ Configuration du routage (TanStack Router)
└── store/             # 📦 Gestion d'état globale
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
| `dictionary` | Recherche de mots, définitions, traductions | 🚧 En développement |
| `flashcards` | Création et étude de cartes mémoire | 🚧 En développement |
| `exercises` | Exercices interactifs d'apprentissage | 🚧 En développement |
| `community` | Partage, discussions, profils publics | 🚧 En développement |
| `profile` | Gestion du profil et préférences utilisateur | 🚧 En développement |

## 🔧 Core (Fondations)

Le dossier `core` contient tous les éléments partagés entre les features :

### 🎨 Components
- **`layout/`** : Composants de mise en page (`Layout`, `AppBar`, `Footer`) — Tailwind pur
- **`notifications/`** : Système de notifications toast (`NotificationProvider`, `GlobalNotifications`, `useNotify`)
- **`ui/`** : Composants shadcn/ui générés via `npx shadcn add` → `src/components/ui/`

### 🪝 Hooks
Hooks personnalisés partagés :
- `useTranslation` : Raccourci i18n
- `useImageCache` : Cache d'images
- `useNotify` : Notifications toast

### ⚙️ Services
- **`queryClient.ts`** : Configuration TanStack Query (`QueryClient` global)
- **`apiClient.ts`** : Mutateur fetch custom pour orval — gère `credentials: 'include'`, les erreurs typées et les réponses 204

### 🤖 API généré (`core/api/`)
Hooks TanStack Query et types TypeScript **auto-générés** depuis le spec OpenAPI du serveur via **orval**.

> ⚠️ Ne pas modifier ces fichiers manuellement — les regénérer avec `npm run generate:api`

| Dossier | Hooks générés |
|---------|---------------|
| `authentification/` | `usePostApiV1AuthRegister`, `usePostApiV1AuthLogin`, etc. |
| `dictionnaire/` | `useGetApiV1DictionarySearch`, etc. |
| `flashcards/` | `useGetApiV1Flashcards`, `usePostApiV1Flashcards`, etc. |
| `utilisateurs/` | `useGetApiV1UsersMe`, `usePatchApiV1UsersMe`, etc. |
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
import { usePostApiV1AuthLogin } from '@core/api/authentification/authentification';

const loginMutation = usePostApiV1AuthLogin();
loginMutation.mutate({ email, password });
```

### 🛠️ Utils
Fonctions utilitaires :
- **Formatters** : Formatage de dates, nombres, etc.
- **Validators** : Validation de formulaires
- **Constants** : Constantes de l'application

### 🌍 i18n
- **Config** : Configuration de l'internationalisation
- **Locales** : Fichiers de traduction (fr, en, zh)

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
// Composants shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
```

### Import d'une page
```typescript
import HomePage from '@/pages/HomePage';
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
