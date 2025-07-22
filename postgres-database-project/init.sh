#!/bin/bash
# Script principal d'initialisation de la base de données

echo "=== Initialisation de Le Jardin des Langues ==="

# Extensions et configuration de base
echo "Configuration des extensions PostgreSQL..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Création des extensions nécessaires
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    CREATE EXTENSION IF NOT EXISTS "unaccent";
    
    -- Configuration pour le support des langues amélioré
    ALTER DATABASE lejardin_db SET default_text_search_config = 'pg_catalog.simple';
    
    SELECT 'Extensions configurées avec succès!' as message;
EOSQL

# Exécution des migrations
echo "Exécution des migrations..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/02_migrations/000_run_migrations.sql

# Exécution des triggers
echo "Création des triggers..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/03_triggers/update_timestamps.sql

# Exécution des seeds
echo "Insertion des données de test..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/06_seeds/000_run_seeds.sql

echo "=== Initialisation terminée avec succès ! ==="
