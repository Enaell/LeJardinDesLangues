-- Script de configuration pour Le Jardin des Langues
-- Exécuté après init.sql pour définir la structure de la base de données

-- Configuration spécifique pour l'application
-- Note: shared_preload_libraries doit être configuré dans postgresql.conf, pas en SQL

-- Configuration pour les recherches textuelles
-- Optimisation pour les recherches de mots et définitions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_ts_config WHERE cfgname = 'french_simple') THEN
        CREATE TEXT SEARCH CONFIGURATION french_simple (COPY = simple);
        ALTER TEXT SEARCH CONFIGURATION french_simple 
            ALTER MAPPING FOR word WITH french_stem;
    END IF;
END
$$;

-- Message de confirmation
SELECT 'Configuration de la base de données Le Jardin des Langues terminée!' as message;