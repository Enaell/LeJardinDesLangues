#!/bin/bash

# Script de sauvegarde pour Le Jardin des Langues
# Compatible avec la configuration Docker

# Variables d'environnement avec valeurs par défaut
DB_NAME="${POSTGRES_DB:-lejardin_db}"
DB_USER="${POSTGRES_USER:-lejardin}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/lejardin_db_backup_$TIMESTAMP.sql"

# Créer le répertoire de sauvegarde s'il n'existe pas
mkdir -p $BACKUP_DIR

echo "Début de la sauvegarde de la base de données $DB_NAME..."

# Exécuter la commande de sauvegarde
if command -v docker &> /dev/null && docker ps | grep -q lejardin_postgres; then
    # Si Docker est disponible et le conteneur tourne, utiliser Docker
    echo "Utilisation du conteneur Docker pour la sauvegarde..."
    docker exec lejardin_postgres pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE
else
    # Sinon, utiliser pg_dump directement
    echo "Utilisation de pg_dump local..."
    PGPASSWORD="${POSTGRES_PASSWORD:-password}" pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME > $BACKUP_FILE
fi

# Vérifier si la sauvegarde a réussi
if [ $? -eq 0 ] && [ -s $BACKUP_FILE ]; then
    echo "✅ Sauvegarde réussie!"
    echo "📁 Fichier: $BACKUP_FILE"
    echo "📊 Taille: $(du -h $BACKUP_FILE | cut -f1)"
    
    # Supprimer les anciennes sauvegardes (garder les 10 plus récentes)
    ls -1t $BACKUP_DIR/lejardin_db_backup_*.sql 2>/dev/null | tail -n +11 | xargs -r rm
    echo "🧹 Anciennes sauvegardes nettoyées (gardé les 10 plus récentes)"
else
    echo "❌ Échec de la sauvegarde!"
    rm -f $BACKUP_FILE
    exit 1
fi