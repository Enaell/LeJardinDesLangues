# Le Jardin des Langues 🌱

**Le Jardin des Langues** est une application web et mobile destinée à faciliter l'apprentissage des langues, en commençant par le chinois et le français.

## 🚀 Démarrage rapide avec Docker

### Prérequis
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Installation et lancement

#### Option 1: Script automatique (recommandé)

**Windows:**
```bash
# Cloner le projet
git clone https://github.com/Enaell/LeJardinDesLangues.git
cd LeJardinDesLangues

# Lancer le script de démarrage
start.bat
```

**Linux/macOS:**
```bash
# Cloner le projet
git clone https://github.com/Enaell/LeJardinDesLangues.git
cd LeJardinDesLangues

# Rendre le script exécutable et le lancer
chmod +x start.sh
./start.sh
```

#### Option 2: Commandes manuelles

```bash
# 1. Copier le fichier d'environnement
cp .env.example .env

# 2. Modifier les variables d'environnement selon vos besoins
# Éditer le fichier .env

# 3. Construire et démarrer les services
docker-compose up -d --build
```

### Accès aux services

Une fois les services démarrés :

- 🌐 **Frontend (React + Vite)**: http://localhost:5173
- 🚀 **Backend (NestJS)**: http://localhost:3000
- 🗄️ **Base de données (PostgreSQL)**: localhost:5432
- 📊 **Prisma Studio**: `make studio` (pour visualiser la BDD)

## 🛠️ Commandes utiles

Le projet inclut un Makefile avec des commandes pratiques :

```bash
make help              # Affiche toutes les commandes disponibles
make up                # Démarre tous les services
make down              # Arrête tous les services
make logs              # Affiche les logs de tous les services
make logs-server       # Logs du backend uniquement
make logs-client       # Logs du frontend uniquement
make shell-server      # Shell dans le container serveur
make shell-db          # Shell PostgreSQL
make migrate           # Exécute les migrations Prisma
make test              # Lance les tests
make clean             # Nettoie les containers et volumes
```

## 🏗️ Architecture

### Services Docker

1. **PostgreSQL** (`postgres`) - Base de données principale
2. **PostgreSQL Test** (`postgres_test`) - Base de données pour les tests
3. **Backend** (`server`) - API NestJS avec Prisma
4. **Frontend** (`client`) - Application React avec Vite

### Structure du projet

```
LeJardinDesLangues/
├── client/                 # Frontend React + TypeScript + Vite
│   ├── Dockerfile
│   ├── nginx.conf         # Configuration Nginx pour la production
│   └── .dockerignore
├── server/                # Backend NestJS + Prisma
│   ├── Dockerfile
│   ├── prisma/
│   │   └── init.sql      # Script d'initialisation PostgreSQL
│   └── .dockerignore
├── docker-compose.yml     # Configuration pour le développement
├── docker-compose.prod.yml # Configuration pour la production
├── .env.example          # Variables d'environnement d'exemple
├── Makefile              # Commandes utiles
├── start.sh              # Script de démarrage (Linux/macOS)
└── start.bat             # Script de démarrage (Windows)
```

## 🧪 Tests

### Tests Backend (Jest)

```bash
# Lancer tous les tests backend
make test

# Tests en mode watch
docker-compose exec server npm run test:watch

# Tests de couverture
docker-compose exec server npm run test:cov
```

### Tests Frontend (Cypress)

```bash
# Tests end-to-end
make test-e2e

# Interface Cypress
docker-compose exec client npx cypress open
```

## 🗄️ Base de données

### Migrations Prisma

```bash
# Créer une nouvelle migration
docker-compose exec server npx prisma migrate dev --name nom_migration

# Appliquer les migrations
make migrate

# Reset la base de données
make migrate-reset

# Générer le client Prisma
make generate
```

### Prisma Studio

```bash
# Ouvrir Prisma Studio pour visualiser la BDD
make studio
```

### Sauvegarde

```bash
# Créer une sauvegarde de la base de données
make backup-db
```

## 🚀 Déploiement en production

Pour le déploiement en production, utilisez le fichier `docker-compose.prod.yml` :

```bash
# Variables d'environnement pour la production
cp .env.example .env.prod
# Modifier .env.prod avec les valeurs de production

# Démarrer en mode production
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## 🔧 Développement

### Structure recommandée

```
client/
├── src/
│   ├── components/        # Composants React réutilisables
│   ├── pages/            # Pages de l'application
│   ├── hooks/            # Hooks personnalisés
│   ├── services/         # Services API (React Query)
│   ├── types/            # Types TypeScript
│   ├── utils/            # Utilitaires
│   └── i18n/             # Fichiers de traduction
└── package.json

server/
├── src/
│   ├── auth/             # Module d'authentification
│   ├── users/            # Module utilisateurs
│   ├── dictionary/       # Module dictionnaire
│   ├── flashcards/       # Module flashcards
│   ├── common/           # Code commun (guards, filters, etc.)
│   └── prisma/           # Configuration Prisma
├── prisma/
│   ├── schema.prisma     # Schéma de base de données
│   └── migrations/       # Migrations
└── package.json
```

### Hot reload

Le hot reload est activé par défaut en mode développement :
- Le frontend se recharge automatiquement lors des modifications
- Le backend redémarre automatiquement avec nodemon

## 📚 Technologies utilisées

### Frontend
- **React 19** avec **TypeScript**
- **Vite 7** pour le build et le développement
- **Material-UI 7** + **Tailwind CSS 4** pour l'interface
- **TanStack Query 5** pour la gestion des APIs
- **TanStack Router** pour le routage
- **TanStack Form** pour les formulaires
- **react-i18next** pour l'internationalisation
- **Vitest** + **Testing Library** pour les tests unitaires
- **Cypress** pour les tests E2E

### Backend
- **Node.js 22** avec **NestJS 11**
- **Prisma 6** comme ORM (IDs en `cuid()`)
- **PostgreSQL 16** comme base de données
- **Redis** pour le cache (production)
- **JWT** (httpOnly cookies) + **OAuth 2.0** pour l'authentification
- **Argon2id** pour le hashage des mots de passe
- **Jest 29** pour les tests
- **Swagger** pour la documentation API

### DevOps
- **Docker** et **Docker Compose**
- **GitHub Actions** pour CI/CD
- **Nginx** pour le reverse proxy en production

## 🗄️ Base de données PostgreSQL

Le projet utilise PostgreSQL 16 avec une configuration complète incluant migrations, seeds, fonctions, vues et triggers.

### Structure de la base de données

```
postgres-database-project/
├── src/
│   ├── migrations/          # Scripts de migration
│   ├── seeds/              # Données de test
│   ├── functions/          # Fonctions SQL personnalisées
│   ├── views/              # Vues analytiques
│   └── triggers/           # Triggers automatiques
└── scripts/                # Scripts de sauvegarde/restauration
```

### Tables principales

- **users** - Gestion des utilisateurs avec validation email
- **words** - Dictionnaire avec recherche textuelle optimisée
- **flashcards** - Cartes d'apprentissage liées aux utilisateurs et mots

### Commandes utiles

```bash
# Accéder à la base de données
docker-compose exec postgres psql -U lejardin -d lejardin_db

# Sauvegarder la base de données
make backup-db

# Restaurer une sauvegarde
make restore-db BACKUP=fichier.sql

# Recréer complètement la base de données
make reset-db

# Voir les logs de la base de données
make logs-db
```

### Test de la configuration

```bash
# Windows
.\test-postgres.ps1

# Ou avec le fichier batch
.\test-postgres.bat
```

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.