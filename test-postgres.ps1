# Script PowerShell pour tester la configuration PostgreSQL
# Le Jardin des Langues

Write-Host "Configuration PostgreSQL - Le Jardin des Langues" -ForegroundColor Green
Write-Host ""

Write-Host "Arrêt des containers existants..." -ForegroundColor Yellow
docker-compose down -v

Write-Host ""
Write-Host "Démarrage de la base de données PostgreSQL uniquement..." -ForegroundColor Yellow
docker-compose up -d postgres

Write-Host ""
Write-Host "Attente de l'initialisation de la base de données..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "Vérification du statut du container..." -ForegroundColor Cyan
docker-compose ps postgres

Write-Host ""
Write-Host "Vérification des logs d'initialisation..." -ForegroundColor Cyan
docker-compose logs postgres --tail 20

Write-Host ""
Write-Host "Test de connexion à la base de données..." -ForegroundColor Cyan
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "\dt"

Write-Host ""
Write-Host "Vérification des tables créées..." -ForegroundColor Cyan
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

Write-Host ""
Write-Host "Vérification des données de seed..." -ForegroundColor Cyan
docker-compose exec postgres psql -U lejardin -d lejardin_db -c "SELECT COUNT(*) as total_users FROM users; SELECT COUNT(*) as total_words FROM words; SELECT COUNT(*) as total_flashcards FROM flashcards;"

Write-Host ""
Write-Host "Configuration terminée!" -ForegroundColor Green
Write-Host "Pour accéder à la base de données: docker-compose exec postgres psql -U lejardin -d lejardin_db" -ForegroundColor White
Write-Host "Pour voir les logs: docker-compose logs postgres" -ForegroundColor White
Write-Host "Pour arrêter: docker-compose down" -ForegroundColor White

Read-Host "Appuyez sur Entrée pour continuer..."
