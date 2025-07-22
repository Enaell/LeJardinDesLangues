CREATE TABLE flashcard_reviews (
    id SERIAL PRIMARY KEY,
    flashcard_id INTEGER NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
    reviewer_id INTEGER NOT NULL REFERENCES users(id), -- Modérateur/admin
    review_action VARCHAR(20) NOT NULL,           -- 'approve', 'reject', 'request_changes'
    review_comment TEXT,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CHECK (review_action IN ('approve', 'reject', 'request_changes')),
    CHECK (previous_status IN ('draft', 'pending_review', 'approved', 'rejected')),
    CHECK (new_status IN ('draft', 'pending_review', 'approved', 'rejected'))
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_flashcard_reviews_flashcard ON flashcard_reviews(flashcard_id);
CREATE INDEX idx_flashcard_reviews_reviewer ON flashcard_reviews(reviewer_id);
CREATE INDEX idx_flashcard_reviews_action ON flashcard_reviews(review_action);
CREATE INDEX idx_flashcard_reviews_created_at ON flashcard_reviews(created_at);
