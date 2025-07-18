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
- **Framework** : React + TypeScript.
- **UI** : Material-UI couplé avec Tailwind CSS pour une personnalisation avancée.
- **Build Tool** : Vite pour un développement rapide.

### Frontend Mobile
- **Framework** : React Native.

### Backend
- **Serveur** : Node.js avec NestJS.
- **ORM** : Prisma pour une gestion simplifiée de la base de données.

### Base de données
- **Type** : PostgreSQL.

### Environnement de développement
- **Conteneurisation** : Docker Compose pour un environnement reproductible.

### Fonctionnalités à explorer
- Hébergement scalable (ex. : AWS, Vercel).

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
  - **bcrypt** pour le hashage des mots de passe.

### 2. Authentification par OAuth 2.0
- **Utilisation** : Pour les utilisateurs qui préfèrent se connecter via des fournisseurs tiers (Google, Facebook, etc.).
- **Fonctionnement** :
  - Redirection vers le fournisseur tiers pour l'authentification.
  - Retour à l'application avec un token d'accès.
  - Génération d’un token JWT pour unifier la gestion des sessions.
- **Outils** :
  - **Passport.js** avec des stratégies OAuth (Google, Facebook).
  - **@nestjs/passport** pour l'intégration avec NestJS.

### Unification des sessions
- Génération d’un token JWT unique après authentification réussie (JWT ou OAuth).
- Stockage sécurisé des tokens (ex. : cookies httpOnly).

### Sécurité
- **Scopes OAuth** : Limiter les permissions demandées aux fournisseurs tiers (ex. : email, profil de base).
- **Expiration des tokens** : Configurer une expiration courte et utiliser des tokens de rafraîchissement.
- **Stockage sécurisé** : Utiliser des cookies sécurisés (httpOnly).

---

## 🏗️ Architecture

### Monolithique avec modularité
- **Organisation modulaire** :
  - Chaque fonctionnalité (ex. : authentification, dictionnaire, flashcards) sera implémentée sous forme de modules indépendants dans NestJS.
  - Modélisation facilitant une future séparation en microservices.

### Transition vers des microservices
- Préparation d’une communication inter-modules pouvant être remplacée par des messages asynchrones (ex. : RabbitMQ, Kafka).
- Structuration de la base de données pour éviter les dépendances complexes.

### APIs REST
- Développement en **REST** pour garantir compatibilité et simplicité d'intégration.
- Documentation des endpoints (ex. : Swagger/OpenAPI).

---

## 🌍 Internationalisation (i18n)

### Backend
- Utilisation de **nestjs-i18n** pour gérer les traductions côté serveur.
- Organisation des fichiers de traduction par langue (ex. : `en.json`, `fr.json`, `zh.json`).
- Middleware pour détecter automatiquement la langue préférée de l'utilisateur.

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