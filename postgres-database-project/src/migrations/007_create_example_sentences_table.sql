CREATE TABLE example_sentences (
    id SERIAL PRIMARY KEY,
    word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    sentence TEXT NOT NULL,
    translation TEXT,                              -- Traduction de la phrase
    language_code VARCHAR(5) NOT NULL,             -- Langue de la traduction
    validated BOOLEAN DEFAULT FALSE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CHECK (language_code ~ '^[a-z]{2}$')          -- Format code langue ISO
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_example_sentences_word_id ON example_sentences(word_id);
CREATE INDEX idx_example_sentences_language ON example_sentences(language_code);
CREATE INDEX idx_example_sentences_validated ON example_sentences(validated);
