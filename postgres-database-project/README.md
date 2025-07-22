# Base de données PostgreSQL - Le Jardin des Langues

Ce dossier contient la configuration complète de la base de données PostgreSQL pour l'application Le Jardin des Langues.

## Structure du projet

```
postgres-database-project/
├── src/
│   ├── migrations/          # Scripts de migration de la base de données
│   │   ├── 000_run_migrations.sql    # Script principal d'exécution
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_words_table.sql
│   │   ├── 003_create_flashcards_table.sql
│   │   └── 004_create_indexes.sql
│   ├── seeds/              # Données de test
│   │   ├── 000_run_seeds.sql         # Script principal d'exécution
│   │   ├── users.sql
│   │   ├── words.sql
│   │   └── flashcards.sql
│   ├── functions/          # Fonctions SQL personnalisées
│   │   └── search_functions.sql
│   ├── views/              # Vues pour les rapports et analyses
│   │   └── user_progress_view.sql
│   └── triggers/           # Triggers automatiques
│       └── update_timestamps.sql
├── scripts/                # Scripts utilitaires
│   ├── setup.sql          # Configuration initiale
│   ├── backup.sh          # Script de sauvegarde
│   └── restore.sh         # Script de restauration
├── docker-compose.yml     # Configuration Docker autonome
└── README.md
```

## Intégration avec Docker Compose

La base de données est maintenant intégrée dans le docker-compose.yml principal du projet. Les scripts sont montés dans l'ordre suivant :

1. **init.sql** - Initialisation des extensions PostgreSQL
2. **setup.sql** - Configuration spécifique de l'application
3. **migrations/** - Création des tables et index
4. **functions/** - Fonctions personnalisées
5. **views/** - Vues pour les rapports
6. **triggers/** - Triggers automatiques
7. **seeds/** - Données de test

## Tables principales

### users
- Stockage des informations utilisateur
- Validation automatique de l'email
- Timestamps automatiques

### words
- Dictionnaire des mots
- Support de la recherche textuelle
- Pronunciation phonétique

### flashcards
- Cartes d'apprentissage personnalisées
- Liens vers users et words
- Exemples et notes personnalisées

## Fonctionnalités

### Recherche optimisée
- Index GIN pour la recherche textuelle
- Fonctions de recherche personnalisées
- Support multilingue

### Vues analytiques
- Suivi des progrès utilisateur
- Statistiques d'utilisation
- Mots populaires

### Triggers automatiques
- Mise à jour des timestamps
- Validation des données
- Contraintes d'intégrité

## Démarrage

Pour démarrer la base de données avec les données de test :

```bash
docker-compose up postgres
```

Pour réinitialiser complètement la base de données :

```bash
docker-compose down -v
docker-compose up postgres
```

## Sauvegarde et restauration

Utilisez les scripts fournis :

```bash
# Sauvegarde
./scripts/backup.sh

# Restauration
./scripts/restore.sh backup_file.sql
```

## Configuration

Les variables d'environnement peuvent être configurées dans un fichier `.env` :

```env
POSTGRES_USER=lejardin
POSTGRES_PASSWORD=password
POSTGRES_DB=lejardin_db
POSTGRES_PORT=5432
```