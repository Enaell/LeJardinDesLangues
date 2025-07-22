-- Index pour optimiser les performances des requêtes
-- PostgreSQL 16 : Utilisation des nouvelles fonctionnalités d'optimisation

-- Index pour les recherches sur la table users
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Index pour les recherches sur la table words
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_text ON words(text);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_language_code ON words(language_code);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_definition_gin ON words USING GIN(to_tsvector('simple', definition));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_text_gin ON words USING GIN(to_tsvector('simple', text));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_created_at ON words(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_validated ON words(validated);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_difficulty_level ON words(difficulty_level);

-- Index pour les recherches sur la table flashcards
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_source_word_id ON flashcards(source_word_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_target_word_id ON flashcards(target_word_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_validation_status ON flashcards(validation_status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_visibility ON flashcards(visibility);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_deck_name ON flashcards(deck_name);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_created_at ON flashcards(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_likes_count ON flashcards(likes_count DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_downloads_count ON flashcards(downloads_count DESC);

-- Index composites pour les requêtes fréquentes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_user_created ON flashcards(user_id, created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_public_approved ON flashcards(visibility, validation_status) WHERE visibility = 'public' AND validation_status = 'approved';
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_text_language ON words(text, language_code);

-- Index pour les timestamps (utile pour les requêtes de range)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_updated_at ON users(updated_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_words_updated_at ON words(updated_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_flashcards_updated_at ON flashcards(updated_at);

\echo 'Tous les index ont été créés avec succès!'
