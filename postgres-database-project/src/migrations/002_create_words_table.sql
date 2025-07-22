CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,                    -- Le mot lui-même
    international_name VARCHAR(255),               -- Pinyin, romanisation, etc.
    language_code VARCHAR(5) NOT NULL,             -- Code ISO 639-1
    part_of_speech VARCHAR(50),                    -- nom, verbe, adjectif, etc.
    definition TEXT,                               -- Définition dans la langue source
    pronunciation VARCHAR(255),                    -- Prononciation phonétique
    difficulty_level INTEGER DEFAULT 1,           -- Niveau de difficulté (1-10)
    frequency_rank INTEGER,                        -- Fréquence d'usage du mot
    subject_tags TEXT[],                          -- Catégories/sujets
    validated BOOLEAN DEFAULT FALSE,               -- Validé par un admin
    created_by INTEGER REFERENCES users(id),      -- Qui a ajouté ce mot
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    UNIQUE(text, language_code),                   -- Un mot unique par langue
    CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    CHECK (language_code ~ '^[a-z]{2}$')          -- Format code langue ISO
);