# Stage de base avec Node.js
FROM node:22-alpine AS base

# Installation des dépendances système
RUN apk add --no-cache curl

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration package
COPY package*.json ./

# Stage de développement
FROM base AS development

# Installation de toutes les dépendances
RUN npm ci

# Copie du code source
COPY . .

# Exposition du port Vite
EXPOSE 5173

# Commande de démarrage pour le développement avec hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage de build
FROM base AS build

# Installation de toutes les dépendances
RUN npm ci

# Copie du code source
COPY . .

# Construction de l'application pour la production
RUN npm run build

# Stage de production avec Nginx
FROM nginx:alpine AS production

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copie des fichiers buildés depuis le stage de build
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port HTTP
EXPOSE 80

# Commande de démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage de test
FROM base AS test

# Installation de toutes les dépendances
RUN npm ci

# Installation de Cypress dependencies
RUN apk add --no-cache \
  gtk+3.0-dev \
  libgtk-3-dev \
  libgconf-2-4 \
  libxss1 \
  libxtst6 \
  libxrandr2 \
  libasound2-dev \
  libpangocairo-1.0-0 \
  libatk1.0-dev \
  libcairo-gobject2 \
  libgtk-3-dev \
  libgdk-pixbuf2.0-dev

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 5173

# Commande par défaut pour les tests
CMD ["npm", "run", "test"]
