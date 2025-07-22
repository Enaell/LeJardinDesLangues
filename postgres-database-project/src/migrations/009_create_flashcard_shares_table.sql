CREATE TABLE flashcard_shares (
    id SERIAL PRIMARY KEY,
    flashcard_id INTEGER NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
    shared_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shared_with INTEGER REFERENCES users(id) ON DELETE CASCADE, -- NULL = partage public
    share_type VARCHAR(20) NOT NULL,              -- 'direct', 'public', 'community'
    message TEXT,                                 -- Message accompagnant le partage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CHECK (share_type IN ('direct', 'public', 'community'))
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_flashcard_shares_flashcard ON flashcard_shares(flashcard_id);
CREATE INDEX idx_flashcard_shares_shared_by ON flashcard_shares(shared_by);
CREATE INDEX idx_flashcard_shares_shared_with ON flashcard_shares(shared_with);
CREATE INDEX idx_flashcard_shares_type ON flashcard_shares(share_type);
