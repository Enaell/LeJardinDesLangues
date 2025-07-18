<SYSTEM>
You are an AI programming assistant that is specialized in applying code changes to a document existing or new.
Follow Microsoft content policies.
Avoid content that violates copyrights.
If you are asked to generate content that is harmful, hateful, racist, sexist, lewd, violent only respond with "Sorry, I can't assist with that."
Keep your answers short and impersonal.
The user has a code block that represents a suggestion for a code change and a instructions file opened in a code editor.
Rewrite the existing document to fully incorporate the code changes in the provided code block.
For the response, always follow these instructions:
1. Analyse the code block and the existing document to decide if the code block should replace existing code or should be inserted.
2. If necessary, break up the code block in multiple parts and insert each part at the appropriate location.
3. Preserve whitespace and newlines right after the parts of the file that you modify.
4. The final result must be syntactically valid, properly formatted, and correctly indented. It should not contain any ...existing code... comments.
5. Finally, provide the fully rewritten file. You must output the complete file.
</SYSTEM>


Je travaille sur Le Jardin des Langues, une application web et mobile destinée à faciliter l’apprentissage des langues, en commençant par le chinois et le français.

⚙️ Objectifs fonctionnels
### Dictionnaire français-chinois
- Recherche de mots avec suggestions dynamiques
- Présentation des résultats sous forme de flashcards interactives

### Flashcards personnalisables
- Création de decks personnalisés par utilisateur
- Stockage des mots avec exemples, notes, prononciation audio, et images
- Synchronisation des decks entre les appareils

### Exercices & jeux ludiques
- Exercices adaptés au niveau de l’utilisateur (débutant à avancé)
- Apprentissage gamifié avec récompenses et progression
- Jeux interactifs pour renforcer la mémorisation

### Partie communautaire
- Partage de mots, notes et decks entre utilisateurs
- Interactions sociales : commentaires, likes, et discussions

### Évolutions prévues
- Textes et livres adaptés au niveau de l’utilisateur
- Fonctions d’IA conversationnelle pour la pratique orale et écrite
- Analyse de progression et recommandations personnalisées
- Ajout de nouvelles langues et fonctionnalités

🧱 Stack technique
### Frontend Web
- **Framework** : React + TypeScript
- **UI** : Material-UI couplé avec Tailwind CSS pour une personnalisation avancée
- **Build Tool** : Vite pour un développement rapide

### Frontend Mobile
- **Framework** : React Native

### Backend
- **Serveur** : Node.js avec NestJS
- **ORM** : Prisma pour une gestion simplifiée de la base de données

### Base de données
- **Type** : PostgreSQL

### Environnement de développement
- **Conteneurisation** : Docker Compose pour un environnement reproductible

### Fonctionnalités à explorer
- Hébergement scalable (ex. : AWS, Vercel)

### Tests et qualité

#### Backend
- **Framework de test** : Jest
- **Base de données** : PostgreSQL en mode Docker pour les tests d’intégration
- **Outils complémentaires** :
  - Testcontainers pour gérer les conteneurs Docker pendant les tests
  - Faker.js pour générer des données de test réalistes

#### Frontend
- **Framework de test** : Cypress
- **Utilisation** : Tests end-to-end pour simuler des scénarios utilisateur complets
- **Outils complémentaires** :
  - Mock Service Worker (MSW) pour simuler des appels API

#### Automatisation
- **CI/CD** :
  - GitHub Actions pour exécuter les tests automatiquement à chaque commit ou pull request
  - Configuration des workflows pour inclure les tests backend et frontend

### Authentification

Pour offrir plus de flexibilité aux utilisateurs, deux méthodes d'authentification seront mises en place :

#### **1. Authentification par JWT**
- **Utilisation** : Pour les utilisateurs qui créent un compte directement sur l'application.
- **Fonctionnement** :
  - Les utilisateurs s'authentifient via email/mot de passe.
  - Un token JWT est généré après validation des identifiants.
  - Le token est utilisé pour accéder aux API sécurisées.
- **Outils** :
  - **@nestjs/jwt** pour la génération et la validation des tokens.
  - **bcrypt** pour le hashage des mots de passe.

#### **2. Authentification par OAuth 2.0**
- **Utilisation** : Pour les utilisateurs qui préfèrent se connecter via des fournisseurs tiers (Google, Facebook, etc.).
- **Fonctionnement** :
  - Redirection vers le fournisseur tiers pour l'authentification.
  - Retour à l'application avec un token d'accès.
  - Un token JWT est généré pour unifier la gestion des sessions.
- **Outils** :
  - **Passport.js** avec des stratégies OAuth (Google, Facebook).
  - **@nestjs/passport** pour l'intégration avec NestJS.

#### **Unification des sessions**
- Après une authentification réussie (JWT ou OAuth), un token JWT est généré pour gérer les sessions de manière uniforme.
- Les tokens JWT sont stockés de manière sécurisée (ex. : cookies httpOnly).

#### **Sécurité**
- **Scopes OAuth** : Limiter les permissions demandées aux fournisseurs tiers (ex. : email, profil de base).
- **Expiration des tokens** : Configurer une expiration courte pour les tokens JWT et utiliser des tokens de rafraîchissement.
- **Stockage sécurisé** : Utiliser des cookies sécurisés (httpOnly) pour stocker les tokens.

### Architecture

L'application sera initialement développée avec une architecture monolithique en utilisant **NestJS**. Cette approche permet de simplifier le développement et le déploiement tout en offrant une base solide pour évoluer vers des microservices si nécessaire.

#### Monolithique avec modularité
- **Organisation modulaire** :
  - Chaque fonctionnalité (ex. : authentification, dictionnaire, flashcards) sera implémentée sous forme de modules indépendants dans NestJS.
  - Cette modularité facilitera la séparation future en microservices.

#### Transition vers des microservices
- L'architecture monolithique sera conçue pour permettre une transition progressive vers des microservices :
  - Utilisation d'interfaces et d'abstractions pour les dépendances entre modules.
  - Préparation d'une communication inter-modules pouvant être remplacée par des messages asynchrones (ex. : RabbitMQ, Kafka).
  - Structuration de la base de données pour éviter les dépendances complexes.

#### APIs REST
- Toutes les APIs seront développées en **REST** pour garantir une compatibilité et une simplicité d'intégration avec le frontend et d'autres clients.
- Une documentation claire des endpoints sera fournie (ex. : Swagger/OpenAPI).

### Internationalisation (i18n)

Pour rendre l'application accessible à un public multilingue, une stratégie d'internationalisation sera mise en place :

#### Backend
- Utilisation de **nestjs-i18n** pour gérer les traductions côté serveur.
- Organisation des fichiers de traduction par langue (ex. : `en.json`, `fr.json`, `zh.json`).
- Middleware pour détecter automatiquement la langue préférée de l'utilisateur (basé sur les en-têtes HTTP ou les paramètres utilisateur).

#### Frontend
- Utilisation de **react-i18next** pour gérer les traductions côté client.
- Chargement dynamique des fichiers de traduction pour optimiser les performances.
- Gestion des langues via un sélecteur dans l'interface utilisateur.

---

### Gestion des API client avec React Query

Pour simplifier la gestion des appels API côté client, **React Query** de TanStack sera utilisé :

#### Avantages
- Gestion automatique du cache des requêtes API.
- Requêtes optimisées avec des fonctionnalités comme le **refetching** et la synchronisation en arrière-plan.
- Gestion simplifiée des états de chargement et des erreurs.

#### Mise en œuvre
- Configuration d'un **QueryClient** global pour l'application.
- Utilisation des hooks `useQuery` et `useMutation` pour interagir avec les endpoints API.

#### Bonnes pratiques
- Structurer les clés de requêtes pour éviter les conflits (ex. : `['user', userId]`).
- Utiliser des options comme `staleTime` et `cacheTime` pour optimiser les performances.

### Gestion du routage avec TanStack Router

Pour gérer le routage dans l'application, **TanStack Router** sera utilisé. Ce choix permet une intégration fluide avec React Query et une gestion optimisée des données.

#### Avantages
- Intégration native avec React Query pour le préchargement et la synchronisation des données.
- Gestion avancée des routes imbriquées et des transitions.
- Performances optimisées pour des applications modernes.

#### Mise en œuvre
- Configuration d'un routeur global avec les routes principales de l'application (ex. : dictionnaire, flashcards, communauté).
- Utilisation des fonctionnalités de préchargement des données pour améliorer l'expérience utilisateur.
- Gestion des erreurs et des redirections directement dans les définitions de routes.

#### Bonnes pratiques
- Structurer les routes de manière modulaire pour faciliter la maintenance.
- Utiliser les hooks fournis par TanStack Router pour accéder aux paramètres de route et aux données préchargées.
- Tester les routes et les transitions pour garantir une navigation fluide.

