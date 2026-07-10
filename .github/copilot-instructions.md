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

---

# Le Jardin des Langues

**Le Jardin des Langues** est une application web et mobile destinée à faciliter l’apprentissage des langues, en commençant par le chinois et le français.

## ⚙️ Objectifs fonctionnels

### Dictionnaire français-chinois
- Recherche de mots avec suggestions dynamiques.
- Présentation des résultats sous forme de flashcards interactives.

### Flashcards personnalisables
- Création de decks personnalisés par utilisateur.
- Stockage des mots avec exemples, notes, prononciation audio, et images.
- Synchronisation des decks entre les appareils.

### Exercices & jeux ludiques
- Exercices adaptés au niveau de l’utilisateur (débutant à avancé).
- Apprentissage gamifié avec récompenses et progression.
- Jeux interactifs pour renforcer la mémorisation.

### Partie communautaire
- Partage de mots, notes et decks entre utilisateurs.
- Interactions sociales : commentaires, likes, et discussions.

### Évolutions prévues
- Textes et livres adaptés au niveau de l’utilisateur.
- Fonctions d’IA conversationnelle pour la pratique orale et écrite.
- Analyse de progression et recommandations personnalisées.
- Ajout de nouvelles langues et fonctionnalités.

---

## 🧱 Stack technique

### Frontend Web
- **Framework** : React + TypeScript 6.
- **UI** : shadcn/ui (style `base-nova`) couplé avec Tailwind CSS v4.
- **Build Tool** : Vite 8 (Rolldown + Oxc) pour un développement rapide.
- **Runtime** : Node.js 24.

### Frontend Mobile
- **Framework** : React Native.

### Backend
- **Serveur** : Node.js 24 avec NestJS.
- **ORM** : Prisma 7 — client généré localement (`src/generated/prisma`), driver adapter `@prisma/adapter-pg` pour PostgreSQL.

### Base de données
- **Type** : PostgreSQL 16.
- **Environnement de test** : PostgreSQL 16 en conteneur dédié.

### Environnement de développement
- **Conteneurisation** : Docker Compose pour un environnement reproductible.

### Fonctionnalités à explorer
- Hébergement scalable (ex. : AWS, Vercel).

---

## 📝 Conventions de codage

### Composants React
- **Déclaration** : Utiliser la syntaxe `const` avec arrow functions :
  ```typescript
  export const MyComponent = (props: MyComponentProps) => {
    // logique du composant
    return <Container>...</Container>;
  };
  ```
- **Éviter** : Les déclarations `function` et `export default`
- **Props** : Toujours typer les props avec un type dédié

### Types vs Interfaces
- **Préférer** : Les `type` plutôt que les `interface`
- **Convention** : Suffixer les types de props avec `Props`
  ```typescript
  type MyComponentProps = {
    title: string;
    isVisible: boolean;
  };
  ```

### Exports
- **Préférer** : Les exports nommés plutôt que les exports par défaut
- **Éviter** : `export default` sauf pour les cas spécifiques (routes, configuration)
- **Organiser** : Regrouper les exports dans des fichiers `index.ts`

## Styles et CSS

### Approche shadcn/ui + Tailwind
- **Tailwind CSS v4** : Layouts, spacing, responsive (`hidden md:flex`, `flex flex-col`, `min-h-screen`)
- **shadcn/ui** : Composants interactifs (`Button`, `Input`, `Card`, `Select`, `Checkbox`, `Badge`, `Label`)
- **Pas de prop `sx`** : Aucune dépendance Material-UI — utiliser exclusivement Tailwind pour les styles

### Hiérarchie des composants
- **1. Composants layout core** (`@core/components/layout`) : `Layout`, `AppBar`, `Footer`
- **2. Composants shadcn/ui** (`@/components/ui/`) : Composants interactifs et formulaires
  ```typescript
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Card, CardContent } from '@/components/ui/card';
  ```
- **3. Balises HTML natives** : Uniquement pour les conteneurs sémantiques (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)
  - Éviter `<div>` non sémantique quand un composant shadcn/ui existe

### Alias de chemins
```
@        → src/
@core    → src/core/
@/       → src/   (alias shadcn — components, lib, hooks)
```

---

## 🧪 Tests et qualité

### Backend
- **Framework de test** : Jest.
- **Base de données** : PostgreSQL en mode Docker pour les tests d’intégration.
- **Outils complémentaires** :
  - Testcontainers pour gérer les conteneurs Docker pendant les tests.
  - Faker.js pour générer des données de test réalistes.

### Frontend
- **Framework de test** : Cypress.
- **Utilisation** : Tests end-to-end pour simuler des scénarios utilisateur complets.
- **Outils complémentaires** :
  - Mock Service Worker (MSW) pour simuler des appels API.

### Automatisation
- **CI/CD** :
  - GitHub Actions pour exécuter les tests automatiquement à chaque commit ou pull request.
  - Configuration des workflows pour inclure les tests backend et frontend.

---

## 🔒 Authentification

### 1. Authentification par JWT
- **Utilisation** : Pour les utilisateurs qui créent un compte directement sur l'application.
- **Fonctionnement** :
  - Authentification via email/mot de passe.
  - Génération d’un token JWT après validation des identifiants.
  - Utilisation du token pour accéder aux API sécurisées.
- **Outils** :
  - **@nestjs/jwt** pour la génération et la validation des tokens.
  - **argon2** pour le hashage des mots de passe (Argon2id).

### 2. Authentification par OAuth 2.0
- **Utilisation** : Pour les utilisateurs qui préfèrent se connecter via des fournisseurs tiers (Google, Facebook, etc.).
- **Fonctionnement** :
  - Redirection vers le fournisseur tiers pour l'authentification.
  - Retour à l'application avec un token d'accès.
  - Génération d’un token JWT pour unifier la gestion des sessions.
- **Outils** :
  - **Passport.js** avec des stratégies OAuth (Google, Facebook).
  - **@nestjs/passport** pour l'intégration avec NestJS.

### Flow post-OAuth onboarding
Après une première connexion Google (`isNewUser: true`), un `LanguageOnboardingModal` s'affiche pour capturer `nativeLanguage` et `targetLanguage`. Le contexte `AuthModalContext` expose `openOnboarding(nativeLanguage)` pour le déclencher. `AuthResponseDto` inclut `isNewUser?: boolean`. `UserResponseDto` inclut `nativeLanguage`, `targetLanguage`, `createdAt`, `updatedAt`.

### Unification des sessions
- Paire de tokens après authentification : **access token** (15 min, httpOnly cookie) + **refresh token** (7 jours, httpOnly cookie).
- Cookie non-httpOnly `is_authenticated` lisible par le JS pour détecter l'état de connexion sans exposer le token.

### Sécurité
- **Scopes OAuth** : Limiter les permissions demandées aux fournisseurs tiers (ex. : email, profil de base).
- **Expiration des tokens** : Configurer une expiration courte et utiliser des tokens de rafraîchissement.
- **Stockage sécurisé** : Utiliser des cookies sécurisés (httpOnly).

---

## 🐳 Architecture Docker

### Services Docker Compose
- **postgres** : Base de données principale PostgreSQL 16
- **postgres_test** : Base de données dédiée aux tests (profile: test)
- **server** : Backend NestJS avec Prisma
- **client** : Frontend React avec Vite
- **redis** : Cache et sessions (production uniquement)

### Multi-stage Dockerfiles
- **Développement** : Hot reload activé, volumes montés
- **Production** : Images optimisées, utilisateurs non-root
- **Test** : Environnement isolé pour les tests


---

## 🏗️ Architecture

### Monolithique avec modularité
- **Organisation modulaire** :
  - Chaque fonctionnalité (ex. : authentification, dictionnaire, flashcards) sera implémentée sous forme de modules indépendants dans NestJS.
  - Modélisation facilitant une future séparation en microservices.

### Frontend Feature-Oriented
Le frontend suit une architecture orientée fonctionnalités avec la structure suivante :

```
src/
├── features/           # Fonctionnalités métier
│   ├── auth/          # Authentification
│   ├── dictionary/    # Dictionnaire
│   ├── flashcards/    # Cartes mémoire
│   ├── exercises/     # Exercices
│   ├── community/     # Communauté
│   └── profile/       # Profil utilisateur
├── core/              # Code partagé et utilitaires
│   ├── components/    # Composants réutilisables
│   │   ├── layout/    # Composants de mise en page
│   │   └── notifications/ # Système toast
│   ├── hooks/         # Hooks personnalisés
│   ├── services/      # queryClient
│   ├── utils/         # Fonctions utilitaires
│   ├── types/         # Types TypeScript globaux
│   └── i18n/          # Configuration et traductions
├── components/ui/     # Composants shadcn/ui générés
├── lib/               # Utilitaires shadcn (cn())
├── routes/            # Configuration du routage (TanStack Router)
└── store/             # Gestion d'état globale
```

Chaque feature contient :
- `components/` : Composants spécifiques à la fonctionnalité
- `hooks/` : Hooks métier pour la fonctionnalité
- `services/` : Services API spécifiques
- `types/` : Types TypeScript pour la fonctionnalité
- `index.ts` : Exports publics de la fonctionnalité

### Transition vers des microservices
- Préparation d’une communication inter-modules pouvant être remplacée par des messages asynchrones (ex. : RabbitMQ, Kafka).
- Structuration de la base de données pour éviter les dépendances complexes.

### APIs REST
- Développement en **REST** pour garantir compatibilité et simplicité d'intégration.
- Documentation des endpoints (ex. : Swagger/OpenAPI).

---

## 🌍 Internationalisation (i18n)


### Frontend
- Utilisation de **react-i18next** pour gérer les traductions côté client.
- Chargement dynamique des fichiers de traduction.
- Sélecteur de langue dans l’interface utilisateur.

---

## 🔄 Gestion des API client avec React Query

### Avantages
- Gestion automatique du cache des requêtes API.
- Requêtes optimisées avec **refetching** et synchronisation en arrière-plan.
- Gestion simplifiée des états de chargement et des erreurs.

### Mise en œuvre
- Configuration d'un **QueryClient** global.
- Utilisation des hooks `useQuery` et `useMutation`.

### Bonnes pratiques
- Structurer les clés de requêtes pour éviter les conflits.
- Utiliser `staleTime` et `cacheTime` pour optimiser les performances.

---

## 🚦 Gestion du routage avec TanStack Router

### Avantages
- Intégration native avec React Query.
- Gestion avancée des routes imbriquées et des transitions.
- Performances optimisées.

### Mise en œuvre
- Configuration d'un routeur global avec les routes principales.
- Préchargement des données pour améliorer l'expérience utilisateur.
- Gestion des erreurs et redirections dans les définitions de routes.

### Bonnes pratiques
- Structurer les routes de manière modulaire.
- Utiliser les hooks pour accéder aux paramètres de route et aux données préchargées.
- Tester les routes pour garantir une navigation fluide.

---

## 📝 Gestion des formulaires avec TanStack Form

### Référence
Pour l'implémentation des formulaires avec TanStack Form, consulter le guide dédié : 
**[Guide TanStack Form](./prompts/tanstack-form-guidelines.md)**

### Principes clés
- **Approche vanilla** : Utiliser `useForm` + `form.Field` directement dans les composants formulaire
- **Pas de wrappers** : Aucun `FormProvider`, `Form`, ni composant d'encapsulation
- **shadcn/ui** : Associer `Input`, `Label`, `Select`, `Checkbox` (`@/components/ui/`) avec les champs TanStack Form
- **Type-safety** : Typer les `defaultValues` pour l'inférence automatique TypeScript
- **Intégration** : Compatible avec React Query (`useMutation`) et TanStack Router
