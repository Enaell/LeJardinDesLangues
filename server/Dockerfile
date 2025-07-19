# Stage de base avec Node.js
FROM node:22-alpine AS base

# Installation des dépendances système nécessaires
RUN apk add --no-cache curl openssl

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration package
COPY package*.json ./
COPY prisma ./prisma/

# Stage de développement
FROM base AS development

# Installation de toutes les dépendances (dev + prod)
RUN npm ci

# Installation de Prisma CLI globalement
RUN npm install -g prisma

# Copie du code source
COPY . .

# Génération des clients Prisma
RUN npx prisma generate

# Exposition du port
EXPOSE 3000

# Script de démarrage pour le développement
CMD ["npm", "run", "start:dev"]

# Stage de production
FROM base AS production

# Installation uniquement des dépendances de production
RUN npm ci --only=production && npm cache clean --force

# Installation de Prisma CLI
RUN npm install -g prisma

# Copie du code source
COPY . .

# Génération des clients Prisma
RUN npx prisma generate

# Construction de l'application
RUN npm run build

# Nettoyage des fichiers de développement
RUN rm -rf src/ test/ *.md

# Création d'un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Changement de propriétaire des fichiers
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start:prod"]

# Stage de test
FROM base AS test

# Installation de toutes les dépendances
RUN npm ci

# Installation de Prisma CLI
RUN npm install -g prisma

# Copie du code source
COPY . .

# Génération des clients Prisma
RUN npx prisma generate

# Exposition du port pour les tests
EXPOSE 3000

# Commande par défaut pour les tests
CMD ["npm", "run", "test"]
