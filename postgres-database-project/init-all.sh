#!/bin/bash
# Script principal d'initialisation de la base de données
# Ce script sera exécuté automatiquement par PostgreSQL lors de la première initialisation

set -e

echo "=== Début de l'initialisation de Le Jardin des Langues ==="

# 1. Configuration et setup
echo "Exécution du setup de la base de données..."
if [ -f /docker-entrypoint-initdb.d/01_setup.sql ]; then
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/01_setup.sql
    echo "✓ Setup terminé"
else
    echo "⚠ Fichier setup.sql non trouvé"
fi

# 2. Exécution des migrations
echo "Exécution des migrations..."
if [ -f /docker-entrypoint-initdb.d/02_migrations/000_run_migrations.sql ]; then
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/02_migrations/000_run_migrations.sql
    echo "✓ Migrations terminées"
else
    echo "⚠ Script de migrations non trouvé"
fi

# 3. Création des fonctions
echo "Création des fonctions..."
for sql_file in /docker-entrypoint-initdb.d/03_functions/*.sql; do
    if [ -f "$sql_file" ]; then
        echo "Exécution de $(basename "$sql_file")"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$sql_file"
    fi
done
echo "✓ Fonctions créées"

# 4. Création des vues
echo "Création des vues..."
for sql_file in /docker-entrypoint-initdb.d/04_views/*.sql; do
    if [ -f "$sql_file" ]; then
        echo "Exécution de $(basename "$sql_file")"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$sql_file"
    fi
done
echo "✓ Vues créées"

# 5. Création des triggers
echo "Création des triggers..."
if [ -f /docker-entrypoint-initdb.d/05_triggers/update_timestamps.sql ]; then
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/05_triggers/update_timestamps.sql
    echo "✓ Triggers créés"
else
    echo "⚠ Script de triggers non trouvé"
fi

# 6. Insertion des données de seed
echo "Insertion des données de seed..."
if [ -f /docker-entrypoint-initdb.d/06_seeds/000_run_seeds.sql ]; then
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/06_seeds/000_run_seeds.sql
    echo "✓ Seeds insérés"
else
    echo "⚠ Script de seeds non trouvé"
fi

# 7. Vérification finale
echo "Vérification des données..."
USERS_COUNT=$(psql -t --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "0")
WORDS_COUNT=$(psql -t --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c "SELECT COUNT(*) FROM words;" 2>/dev/null || echo "0")

echo "📊 Résumé de l'initialisation :"
echo "   - Utilisateurs créés : $USERS_COUNT"
echo "   - Mots dans le dictionnaire : $WORDS_COUNT"

echo "=== Initialisation de Le Jardin des Langues terminée avec succès ! ==="
