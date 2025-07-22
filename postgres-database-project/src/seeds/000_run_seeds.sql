-- Script principal d'exécution des seeds
-- Insère les données de test dans la base de données

\echo 'Début de l''insertion des données de seed...'

-- Seed users
\echo 'Insertion des utilisateurs de test'
\i /docker-entrypoint-initdb.d/06_seeds/users.sql

-- Seed user language levels
\echo 'Insertion des niveaux de langue des utilisateurs'
\i /docker-entrypoint-initdb.d/06_seeds/user_language_levels.sql

-- Seed words
\echo 'Insertion des mots du dictionnaire'
\i /docker-entrypoint-initdb.d/06_seeds/words.sql

-- Seed word translations
\echo 'Insertion des traductions de mots'
\i /docker-entrypoint-initdb.d/06_seeds/word_translations.sql

-- Seed example sentences
\echo 'Insertion des phrases d''exemple'
\i /docker-entrypoint-initdb.d/06_seeds/example_sentences.sql

-- Seed flashcards
\echo 'Insertion des flashcards de test'
\i /docker-entrypoint-initdb.d/06_seeds/flashcards.sql

-- Seed flashcard translations
\echo 'Insertion des relations flashcard-traductions'
\i /docker-entrypoint-initdb.d/06_seeds/flashcard_translations.sql

-- Seed flashcard interactions
\echo 'Insertion des interactions avec les flashcards'
\i /docker-entrypoint-initdb.d/06_seeds/flashcard_interactions.sql

-- Seed flashcard reviews
\echo 'Insertion des avis de modération'
\i /docker-entrypoint-initdb.d/06_seeds/flashcard_reviews.sql

-- Seed flashcard shares
\echo 'Insertion des partages de flashcards'
\i /docker-entrypoint-initdb.d/06_seeds/flashcard_shares.sql

\echo 'Toutes les données de seed ont été insérées avec succès!'
