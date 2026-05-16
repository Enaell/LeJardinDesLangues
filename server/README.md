# Le Jardin des Langues - Serveur API

Backend NestJS pour l'application d'apprentissage des langues Le Jardin des Langues.

## 🚀 Technologies

- **NestJS** - Framework Node.js progressif
- **TypeScript** - Typage statique pour JavaScript
- **Prisma** - ORM moderne pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification par tokens
- **Passport** - Middleware d'authentification
- **Swagger** - Documentation API automatique
- **Jest** - Framework de test

## 📁 Structure du projet

```
src/
├── core/              # Modules centraux (Prisma, etc.)
├── modules/           # Modules fonctionnels
│   ├── auth/         # Authentification
│   ├── users/        # Gestion des utilisateurs
│   ├── dictionary/   # Dictionnaire
│   ├── flashcards/   # Cartes flash
│   ├── exercises/    # Exercices
│   └── community/    # Communauté
├── common/           # Utilitaires communs
├── app.module.ts    # Module principal
└── main.ts          # Point d'entrée
```

## 🛠️ Installation et configuration

### Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configuration de l'environnement**
   ```bash
   cp .env.example .env
   ```
   Modifier le fichier `.env` avec vos paramètres.

3. **Base de données**
   ```bash
   # Générer le client Prisma
   npm run prisma:generate
   
   # Appliquer les migrations
   npm run prisma:migrate
   
   # (Optionnel) Peupler la base de données
   npm run prisma:seed
   ```

## 🚀 Démarrage

### Développement
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Tests
```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:e2e

# Tests avec couverture
npm run test:cov
```

## 📚 API Documentation

Une fois le serveur démarré, la documentation Swagger est accessible à :
```
http://localhost:3000/api/docs
```

## 🔧 Scripts disponibles

- `npm run build` - Compiler le projet
- `npm run start` - Démarrer en mode production
- `npm run start:dev` - Démarrer en mode développement avec hot-reload
- `npm run start:debug` - Démarrer en mode debug
- `npm run lint` - Vérifier le code avec ESLint
- `npm run format` - Formater le code avec Prettier
- `npm run test` - Lancer les tests unitaires
- `npm run test:watch` - Tests en mode watch
- `npm run test:e2e` - Tests d'intégration
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Appliquer les migrations
- `npm run prisma:studio` - Interface graphique Prisma
- `npm run db:reset` - Réinitialiser la base de données

## 🔐 Authentification

L'API supporte plusieurs méthodes d'authentification :

- **Email/Password** - Authentification classique
- **OAuth Google** - Connexion avec Google
- **OAuth Facebook** - Connexion avec Facebook
- **JWT** - Tokens pour l'API

## 🌍 Internationalisation

Le serveur supporte le multi-langue avec les codes ISO 639-1 :
- `fr` - Français
- `en` - Anglais
- `zh` - Chinois
- `es` - Espagnol
- etc.

## 🐳 Docker

Pour utiliser avec Docker :

```bash
# Développement
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up
```

## 📝 Variables d'environnement

Voir le fichier `.env.example` pour la liste complète des variables.

Variables principales :
- `DATABASE_URL` - URL de connexion PostgreSQL
- `JWT_SECRET` - Clé secrète pour les JWT
- `GOOGLE_CLIENT_ID` - ID client Google OAuth
- `FRONTEND_URL` - URL du frontend pour CORS

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
