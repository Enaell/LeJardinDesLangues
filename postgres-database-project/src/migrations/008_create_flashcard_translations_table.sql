CREATE TABLE flashcard_translations (
    id SERIAL PRIMARY KEY,
    flashcard_id INTEGER NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
    translation_id INTEGER NOT NULL REFERENCES word_translations(id) ON DELETE CASCADE,
    rank INTEGER DEFAULT 0,                       -- Ordre de préférence
    personal_note TEXT,                           -- Note sur cette traduction spécifique
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    UNIQUE(flashcard_id, translation_id),
    CHECK (rank >= 0)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_flashcard_translations_flashcard ON flashcard_translations(flashcard_id);
CREATE INDEX idx_flashcard_translations_translation ON flashcard_translations(translation_id);
CREATE INDEX idx_flashcard_translations_rank ON flashcard_translations(flashcard_id, rank);
