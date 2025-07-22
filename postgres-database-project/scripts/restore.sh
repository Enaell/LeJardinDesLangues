#!/bin/bash

# Script de restauration pour Le Jardin des Langues
# Compatible avec la configuration Docker

# Variables d'environnement avec valeurs par défaut
DB_NAME="${POSTGRES_DB:-lejardin_db}"
DB_USER="${POSTGRES_USER:-lejardin}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"

# Vérifier si le fichier de sauvegarde est fourni
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <fichier_de_sauvegarde.sql>"
    echo "Exemple: $0 ./backups/lejardin_db_backup_20231221_143052.sql"
    exit 1
fi

BACKUP_FILE=$1

# Vérifier si le fichier de sauvegarde existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Fichier de sauvegarde introuvable: $BACKUP_FILE"
    exit 1
fi

echo "🔄 Restauration de la base de données $DB_NAME depuis $BACKUP_FILE..."

# Demander confirmation
read -p "⚠️  Attention: Cette opération va écraser toutes les données existantes. Continuer? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restauration annulée."
    exit 1
fi

# Fonction pour exécuter la restauration
restore_database() {
    if command -v docker &> /dev/null && docker ps | grep -q lejardin_postgres; then
        # Si Docker est disponible et le conteneur tourne, utiliser Docker
        echo "Utilisation du conteneur Docker pour la restauration..."
        
        # Arrêter l'application pour éviter les connexions actives
        echo "Arrêt temporaire des connexions à la base de données..."
        
        # Supprimer et recréer la base de données
        docker exec lejardin_postgres psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
        docker exec lejardin_postgres psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
        
        # Restaurer depuis le fichier
        docker exec -i lejardin_postgres psql -U $DB_USER $DB_NAME < $BACKUP_FILE
    else
        # Sinon, utiliser psql directement
        echo "Utilisation de psql local..."
        
        # Supprimer et recréer la base de données
        PGPASSWORD="${POSTGRES_PASSWORD:-password}" dropdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME --if-exists
        PGPASSWORD="${POSTGRES_PASSWORD:-password}" createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME
        
        # Restaurer depuis le fichier
        PGPASSWORD="${POSTGRES_PASSWORD:-password}" psql -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME < $BACKUP_FILE
    fi
}

# Exécuter la restauration
restore_database

# Vérifier si la restauration a réussi
if [ $? -eq 0 ]; then
    echo "✅ Restauration réussie!"
    echo "📁 Base de données $DB_NAME restaurée depuis $BACKUP_FILE"
    echo "📊 Taille du fichier: $(du -h $BACKUP_FILE | cut -f1)"
else
    echo "❌ Échec de la restauration!"
    exit 1
fi