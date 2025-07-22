CREATE TABLE flashcard_interactions (
    id SERIAL PRIMARY KEY,
    flashcard_id INTEGER NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    interaction_type VARCHAR(20) NOT NULL,        -- 'like', 'report', 'download', 'favorite'
    reason TEXT,                                  -- Raison du signalement si applicable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CHECK (interaction_type IN ('like', 'report', 'download', 'favorite')),
    UNIQUE(flashcard_id, user_id, interaction_type) -- Un utilisateur ne peut liker qu'une fois
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_flashcard_interactions_flashcard ON flashcard_interactions(flashcard_id);
CREATE INDEX idx_flashcard_interactions_user ON flashcard_interactions(user_id);
CREATE INDEX idx_flashcard_interactions_type ON flashcard_interactions(interaction_type);
CREATE INDEX idx_flashcard_interactions_flashcard_type ON flashcard_interactions(flashcard_id, interaction_type);
