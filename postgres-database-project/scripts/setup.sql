-- Script de configuration pour Le Jardin des Langues
-- Exécuté après init.sql pour définir la structure de la base de données

-- Configuration spécifique pour l'application
-- Paramètres de performance pour PostgreSQL 16
SET shared_preload_libraries = 'pg_stat_statements';
SET track_activity_query_size = 2048;
SET log_min_duration_statement = 1000; -- Log des requêtes > 1 seconde

-- Configuration pour les recherches textuelles
-- Optimisation pour les recherches de mots et définitions
CREATE TEXT SEARCH CONFIGURATION french_simple (COPY = simple);
ALTER TEXT SEARCH CONFIGURATION french_simple 
    ALTER MAPPING FOR word WITH french_stem;

-- Paramètres de session pour l'optimisation des requêtes
SET enable_seqscan = on;
SET enable_indexscan = on;
SET enable_hashjoin = on;

-- Message de confirmation
SELECT 'Configuration de la base de données Le Jardin des Langues terminée!' as message;