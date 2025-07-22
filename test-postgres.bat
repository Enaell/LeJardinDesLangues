@echo off
REM Script de test pour vérifier la configuration PostgreSQL
REM Utilise Docker Desktop pour Windows

echo Configuration PostgreSQL - Le Jardin des Langues
echo.

echo Arrêt des containers existants...
docker-compose down -v

echo.
echo Démarrage de la base de données PostgreSQL uniquement...
docker-compose up -d postgres

echo.
echo Attente de l'initialisation de la base de données...
timeout /t 10

echo.
echo Vérification du statut du container...
docker-compose ps postgres

echo.
echo Vérification des logs d'initialisation...
docker-compose logs postgres

echo.
echo Test de connexion à la base de données...
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "\dt"

echo.
echo Configuration terminée!
echo Pour accéder à la base de données: docker-compose exec postgres psql -U lejardin -d lejardin_db
pause
