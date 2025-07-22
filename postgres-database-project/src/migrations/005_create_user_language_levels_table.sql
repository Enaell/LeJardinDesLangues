CREATE TABLE user_language_levels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL, -- Code ISO 639-1 (ex: 'fr', 'zh', 'en')
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 10), -- Niveau de 0 à 10
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Un utilisateur ne peut avoir qu'un seul niveau par langue
    UNIQUE(user_id, language_code)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_user_language_levels_user_id ON user_language_levels(user_id);
CREATE INDEX idx_user_language_levels_language_code ON user_language_levels(language_code);
