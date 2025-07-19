-- Script d'initialisation pour PostgreSQL 16
-- Le Jardin des Langues

-- Création des extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Pour la recherche textuelle
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- Pour la recherche sans accents

-- PostgreSQL 16 : Nouvelles optimisations disponibles
-- Configuration pour le support des langues amélioré
ALTER DATABASE lejardin_db SET default_text_search_config = 'pg_catalog.simple';

-- PostgreSQL 16 : Support amélioré pour les index BRIN et les requêtes parallèles
-- Ces optimisations seront utiles pour les recherches dans le dictionnaire

-- Création d'un utilisateur spécifique pour l'application (optionnel)
-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'lejardin_app') THEN
--         CREATE ROLE lejardin_app WITH LOGIN PASSWORD 'app_password';
--         GRANT CONNECT ON DATABASE lejardin_db TO lejardin_app;
--     END IF;
-- END
-- $$;

-- Message de confirmation
SELECT 'Base de données Le Jardin des Langues initialisée avec succès!' as message;
