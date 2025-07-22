# Makefile pour Le Jardin des Langues
# Variables
COMPOSE_FILE=docker-compose.yml
PROJECT_NAME=lejardin

# Couleurs pour les messages
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m # No Color

.PHONY: help build up down restart logs clean test migrate seed setup

# Commande par défaut
help: ## Affiche l'aide
	@echo "$(GREEN)Le Jardin des Langues - Commands disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

setup: ## Configuration initiale du projet
	@echo "$(GREEN)Configuration initiale du projet...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(YELLOW)Fichier .env créé à partir de .env.example$(NC)"; \
		echo "$(RED)⚠️  N'oubliez pas de modifier les valeurs dans .env selon vos besoins$(NC)"; \
	else \
		echo "$(YELLOW)Le fichier .env existe déjà$(NC)"; \
	fi

build: ## Construit les images Docker
	@echo "$(GREEN)Construction des images Docker...$(NC)"
	docker-compose -f $(COMPOSE_FILE) build

up: ## Démarre tous les services en mode détaché
	@echo "$(GREEN)Démarrage des services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up -d

up-build: ## Reconstruit et démarre tous les services
	@echo "$(GREEN)Reconstruction et démarrage des services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up -d --build

down: ## Arrête tous les services
	@echo "$(GREEN)Arrêt des services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down

restart: ## Redémarre tous les services
	@echo "$(GREEN)Redémarrage des services...$(NC)"
	docker-compose -f $(COMPOSE_FILE) restart

logs: ## Affiche les logs de tous les services
	docker-compose -f $(COMPOSE_FILE) logs -f

logs-server: ## Affiche les logs du serveur backend
	docker-compose -f $(COMPOSE_FILE) logs -f server

logs-client: ## Affiche les logs du client frontend
	docker-compose -f $(COMPOSE_FILE) logs -f client

logs-db: ## Affiche les logs de la base de données
	docker-compose -f $(COMPOSE_FILE) logs -f postgres

status: ## Affiche le statut des services
	docker-compose -f $(COMPOSE_FILE) ps

shell-server: ## Ouvre un shell dans le container du serveur
	docker-compose -f $(COMPOSE_FILE) exec server sh

shell-client: ## Ouvre un shell dans le container du client
	docker-compose -f $(COMPOSE_FILE) exec client sh

shell-db: ## Ouvre un shell PostgreSQL
	docker-compose -f $(COMPOSE_FILE) exec postgres psql -U $${POSTGRES_USER:-lejardin} -d $${POSTGRES_DB:-lejardin_db}

migrate: ## Exécute les migrations Prisma
	@echo "$(GREEN)Exécution des migrations Prisma...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npx prisma migrate dev

migrate-reset: ## Reset la base de données et applique les migrations
	@echo "$(YELLOW)Reset de la base de données...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npx prisma migrate reset --force

generate: ## Génère le client Prisma
	@echo "$(GREEN)Génération du client Prisma...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npx prisma generate

seed: ## Exécute le seeding de la base de données
	@echo "$(GREEN)Seeding de la base de données...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npm run seed

studio: ## Ouvre Prisma Studio
	@echo "$(GREEN)Ouverture de Prisma Studio...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npx prisma studio

test: ## Lance les tests du backend
	@echo "$(GREEN)Lancement des tests...$(NC)"
	docker-compose -f $(COMPOSE_FILE) --profile test up -d postgres_test
	docker-compose -f $(COMPOSE_FILE) --profile test run --rm test
	docker-compose -f $(COMPOSE_FILE) --profile test down

test-e2e: ## Lance les tests end-to-end avec Cypress
	@echo "$(GREEN)Lancement des tests E2E...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec client npm run test:e2e

install-server: ## Installe les dépendances du serveur
	@echo "$(GREEN)Installation des dépendances du serveur...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec server npm install

install-client: ## Installe les dépendances du client
	@echo "$(GREEN)Installation des dépendances du client...$(NC)"
	docker-compose -f $(COMPOSE_FILE) exec client npm install

clean: ## Nettoie les containers, volumes et images
	@echo "$(YELLOW)Nettoyage des containers et volumes...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f

clean-all: ## Nettoie tout (containers, volumes, images, cache)
	@echo "$(RED)Nettoyage complet...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -af
	docker volume prune -f

backup-db: ## Sauvegarde la base de données
	@echo "$(GREEN)Sauvegarde de la base de données...$(NC)"
	@chmod +x postgres-database-project/scripts/backup.sh
	@./postgres-database-project/scripts/backup.sh

restore-db: ## Restaure la base de données (Usage: make restore-db BACKUP=fichier.sql)
	@echo "$(GREEN)Restauration de la base de données...$(NC)"
	@if [ -z "$(BACKUP)" ]; then \
		echo "$(RED)Usage: make restore-db BACKUP=fichier.sql$(NC)"; \
		exit 1; \
	fi
	@chmod +x postgres-database-project/scripts/restore.sh
	@./postgres-database-project/scripts/restore.sh $(BACKUP)

reset-db: ## Recrée complètement la base de données avec les migrations
	@echo "$(YELLOW)Recréation complète de la base de données...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down postgres
	docker volume rm lejardindeslanges_postgres_data || true
	docker-compose -f $(COMPOSE_FILE) up -d postgres
	@echo "$(GREEN)Base de données recréée avec les dernières migrations!$(NC)"

dev: setup up ## Configuration et démarrage rapide pour le développement
	@echo "$(GREEN)Environnement de développement prêt!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Pour voir les logs: make logs$(NC)"

prod: ## Démarre en mode production
	@echo "$(GREEN)Démarrage en mode production...$(NC)"
	NODE_ENV=production docker-compose -f $(COMPOSE_FILE) up -d --build
