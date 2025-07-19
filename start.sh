#!/bin/bash

# Script de démarrage rapide pour Le Jardin des Langues
# Ce script configure et démarre l'environnement de développement

set -e

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌱 Le Jardin des Langues - Configuration de l'environnement${NC}"
echo ""

# Vérification de Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker n'est pas installé. Veuillez installer Docker Desktop.${NC}"
    exit 1
fi

# Vérification de Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose n'est pas installé.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker et Docker Compose sont installés${NC}"

# Configuration du fichier .env
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Création du fichier .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
    echo -e "${YELLOW}⚠️  N'oubliez pas de modifier les valeurs dans .env selon vos besoins${NC}"
else
    echo -e "${GREEN}✅ Fichier .env existe déjà${NC}"
fi

# Vérification de l'état de Docker
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker ne semble pas être en cours d'exécution. Veuillez démarrer Docker Desktop.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker est en cours d'exécution${NC}"

# Construction et démarrage des services
echo -e "${BLUE}🔨 Construction des images Docker...${NC}"
docker-compose build

echo -e "${BLUE}🚀 Démarrage des services...${NC}"
docker-compose up -d

# Attendre que les services soient prêts
echo -e "${YELLOW}⏳ Attente du démarrage des services...${NC}"
sleep 10

# Vérification de l'état des services
echo -e "${BLUE}📊 Vérification de l'état des services...${NC}"
docker-compose ps

# Affichage des URLs
echo ""
echo -e "${GREEN}🎉 Environnement de développement prêt !${NC}"
echo ""
echo -e "${BLUE}📱 Frontend (React + Vite):${NC} http://localhost:5173"
echo -e "${BLUE}🚀 Backend (NestJS):${NC} http://localhost:3000"
echo -e "${BLUE}🗄️  Base de données (PostgreSQL):${NC} localhost:5432"
echo ""
echo -e "${YELLOW}📋 Commandes utiles:${NC}"
echo -e "  • ${BLUE}make logs${NC}          - Voir les logs"
echo -e "  • ${BLUE}make shell-server${NC}  - Shell dans le container serveur"
echo -e "  • ${BLUE}make shell-db${NC}      - Shell PostgreSQL"
echo -e "  • ${BLUE}make down${NC}          - Arrêter les services"
echo -e "  • ${BLUE}make help${NC}          - Voir toutes les commandes"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
