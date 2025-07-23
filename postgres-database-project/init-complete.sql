-- Script principal d'initialisation complète
-- Exécute les migrations, triggers et seeds

\echo 'Début de l''initialisation complète...'

-- Exécution des migrations
\echo 'Exécution des migrations...'
\i /docker-entrypoint-initdb.d/02_migrations/000_run_migrations.sql

-- Exécution des triggers
\echo 'Création des triggers...'
\i /docker-entrypoint-initdb.d/05_triggers/update_timestamps.sql

-- Exécution des seeds
\echo 'Insertion des données de seed...'
\i /docker-entrypoint-initdb.d/06_seeds/000_run_seeds.sql

-- Vérification finale
\echo 'Vérification des données...'
SELECT 'Nombre d''utilisateurs: ' || COUNT(*) FROM users;
SELECT 'Nombre de mots: ' || COUNT(*) FROM words;
SELECT 'Nombre de flashcards: ' || COUNT(*) FROM flashcards;

\echo 'Initialisation complète terminée avec succès!'
