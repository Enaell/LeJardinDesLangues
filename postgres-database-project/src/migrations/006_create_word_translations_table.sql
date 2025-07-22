CREATE TABLE word_translations (
    id SERIAL PRIMARY KEY,
    source_word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    target_word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    confidence_score DECIMAL(3,2) DEFAULT 1.0,    -- Score de confiance (0.00-1.00)
    context VARCHAR(100),                          -- Contexte de la traduction
    validated BOOLEAN DEFAULT FALSE,               -- Validé par un admin
    created_by INTEGER REFERENCES users(id),      -- Qui a créé cette traduction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    UNIQUE(source_word_id, target_word_id),
    CHECK(source_word_id != target_word_id),       -- Éviter l'auto-référence
    CHECK(confidence_score >= 0.0 AND confidence_score <= 1.0)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_word_translations_source ON word_translations(source_word_id);
CREATE INDEX idx_word_translations_target ON word_translations(target_word_id);
CREATE INDEX idx_word_translations_validated ON word_translations(validated);
