#!/bin/bash
# Script pour démarrer la base de données PostgreSQL avec seeding

echo "=== Démarrage de la base de données Le Jardin des Langues ==="

# Arrêter et nettoyer les conteneurs existants
echo "Nettoyage des conteneurs existants..."
docker-compose down -v 2>/dev/null || true

# Supprimer les conteneurs postgres existants s'ils existent
docker rm -f lejardin_postgres 2>/dev/null || true

# Démarrer uniquement PostgreSQL
echo "Démarrage de PostgreSQL avec les seeds..."
docker-compose up -d postgres

# Attendre que PostgreSQL soit prêt
echo "Attente du démarrage de PostgreSQL..."
sleep 10

# Vérifier que les seeds ont été appliqués
echo "Vérification des données seedées..."
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT COUNT(*) as users_count FROM users;"
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT COUNT(*) as words_count FROM words;"

echo "=== Base de données prête ! ==="
