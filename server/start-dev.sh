#!/bin/sh

# Script de démarrage pour le développement
# Gère proprement le dossier dist pour éviter les conflits EBUSY

echo "🚀 Démarrage du serveur de développement..."

# Supprimer le dossier dist s'il existe
if [ -d "/app/dist" ]; then
    echo "📁 Suppression du dossier dist existant..."
    rm -rf /app/dist
fi

# Générer les clients Prisma
echo "🔄 Génération des clients Prisma..."
npx prisma generate

# Démarrer NestJS en mode watch avec options supplémentaires
echo "👀 Démarrage de NestJS en mode watch..."
npx nest start --watch --preserveWatchOutput
