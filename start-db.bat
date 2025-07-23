@echo off
REM Script pour démarrer la base de données PostgreSQL avec seeding

echo === Démarrage de la base de données Le Jardin des Langues ===

REM Arrêter et nettoyer les conteneurs existants
echo Nettoyage des conteneurs existants...
docker-compose down -v 2>nul

REM Supprimer les conteneurs postgres existants s'ils existent
docker rm -f lejardin_postgres 2>nul

REM Démarrer uniquement PostgreSQL
echo Démarrage de PostgreSQL avec les seeds...
docker-compose up -d postgres

REM Attendre que PostgreSQL soit prêt
echo Attente du démarrage de PostgreSQL...
timeout /t 15 /nobreak >nul

REM Vérifier que les seeds ont été appliqués
echo Vérification des données seedées...
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT COUNT(*) as users_count FROM users;"
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT COUNT(*) as words_count FROM words;"

echo === Base de données prête ! ===
pause
