-- Script principal d'exécution des migrations
-- Exécute toutes les migrations dans l'ordre correct

\echo 'Début des migrations de la base de données...'

-- Migration 001: Création de la table users
\echo 'Migration 001: Création de la table users'
\i /docker-entrypoint-initdb.d/02_migrations/001_create_users_table.sql

-- Migration 002: Création de la table words
\echo 'Migration 002: Création de la table words'
\i /docker-entrypoint-initdb.d/02_migrations/002_create_words_table.sql

-- Migration 003: Création de la table flashcards
\echo 'Migration 003: Création de la table flashcards'
\i /docker-entrypoint-initdb.d/02_migrations/003_create_flashcards_table.sql

-- Migration 004: Création des index
\echo 'Migration 004: Création des index pour optimiser les performances'
\i /docker-entrypoint-initdb.d/02_migrations/004_create_indexes.sql

-- Migration 005: Création de la table user_language_levels
\echo 'Migration 005: Création de la table user_language_levels'
\i /docker-entrypoint-initdb.d/02_migrations/005_create_user_language_levels_table.sql

-- Migration 006: Création de la table word_translations
\echo 'Migration 006: Création de la table word_translations'
\i /docker-entrypoint-initdb.d/02_migrations/006_create_word_translations_table.sql

-- Migration 007: Création de la table example_sentences
\echo 'Migration 007: Création de la table example_sentences'
\i /docker-entrypoint-initdb.d/02_migrations/007_create_example_sentences_table.sql

-- Migration 008: Création de la table flashcard_translations
\echo 'Migration 008: Création de la table flashcard_translations'
\i /docker-entrypoint-initdb.d/02_migrations/008_create_flashcard_translations_table.sql

-- Migration 009: Création de la table flashcard_shares
\echo 'Migration 009: Création de la table flashcard_shares'
\i /docker-entrypoint-initdb.d/02_migrations/009_create_flashcard_shares_table.sql

-- Migration 010: Création de la table flashcard_interactions
\echo 'Migration 010: Création de la table flashcard_interactions'
\i /docker-entrypoint-initdb.d/02_migrations/010_create_flashcard_interactions_table.sql

-- Migration 011: Création de la table flashcard_reviews
\echo 'Migration 011: Création de la table flashcard_reviews'
\i /docker-entrypoint-initdb.d/02_migrations/011_create_flashcard_reviews_table.sql

\echo 'Toutes les migrations ont été exécutées avec succès!'
