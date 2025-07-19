@echo off
REM Script de démarrage rapide pour Le Jardin des Langues (Windows)
REM Ce script configure et démarre l'environnement de développement

echo.
echo 🌱 Le Jardin des Langues - Configuration de l'environnement
echo.

REM Vérification de Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker n'est pas installé. Veuillez installer Docker Desktop.
    pause
    exit /b 1
)

REM Vérification de Docker Compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose n'est pas installé.
    pause
    exit /b 1
)

echo ✅ Docker et Docker Compose sont installés

REM Configuration du fichier .env
if not exist .env (
    echo 📝 Création du fichier .env...
    copy .env.example .env >nul
    echo ✅ Fichier .env créé
    echo ⚠️  N'oubliez pas de modifier les valeurs dans .env selon vos besoins
) else (
    echo ✅ Fichier .env existe déjà
)

REM Vérification de l'état de Docker
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker ne semble pas être en cours d'exécution. Veuillez démarrer Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker est en cours d'exécution

REM Construction et démarrage des services
echo.
echo 🔨 Construction des images Docker...
docker-compose build

echo.
echo 🚀 Démarrage des services...
docker-compose up -d

REM Attendre que les services soient prêts
echo.
echo ⏳ Attente du démarrage des services...
timeout /t 10 /nobreak >nul

REM Vérification de l'état des services
echo.
echo 📊 Vérification de l'état des services...
docker-compose ps

REM Affichage des URLs
echo.
echo 🎉 Environnement de développement prêt !
echo.
echo 📱 Frontend (React + Vite): http://localhost:5173
echo 🚀 Backend (NestJS): http://localhost:3000
echo 🗄️  Base de données (PostgreSQL): localhost:5432
echo.
echo 📋 Commandes utiles:
echo   • make logs          - Voir les logs
echo   • make shell-server  - Shell dans le container serveur
echo   • make shell-db      - Shell PostgreSQL
echo   • make down          - Arrêter les services
echo   • make help          - Voir toutes les commandes
echo.
echo Happy coding! 🚀
pause
