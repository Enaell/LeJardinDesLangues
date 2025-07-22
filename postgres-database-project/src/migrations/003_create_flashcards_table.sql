CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    source_word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    target_word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
    
    -- Contenu personnalisé par l'utilisateur
    title VARCHAR(255),                           -- Titre de la flashcard
    personal_note TEXT,
    mnemonic TEXT,
    personal_examples TEXT[],
    tags TEXT[],
    
    -- Métadonnées d'apprentissage
    deck_name VARCHAR(100),
    
    -- Système de partage et validation
    visibility VARCHAR(20) DEFAULT 'private',     -- 'private', 'pending', 'public'
    validation_status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_review', 'approved', 'rejected'
    validated_by INTEGER REFERENCES users(id),    -- Admin/modérateur qui a validé
    validated_at TIMESTAMP,
    rejection_reason TEXT,                        -- Raison du rejet si applicable
    
    -- Statistiques communautaires
    likes_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    
    -- Données de révision (SRS)
    easiness_factor DECIMAL(3,2) DEFAULT 2.5,
    interval_days INTEGER DEFAULT 1,
    repetition_count INTEGER DEFAULT 0,
    next_review_date DATE DEFAULT CURRENT_DATE,
    last_reviewed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CHECK (visibility IN ('private', 'pending', 'public')),
    CHECK (validation_status IN ('draft', 'pending_review', 'approved', 'rejected')),
    CHECK (
        (validation_status = 'approved' AND validated_by IS NOT NULL AND validated_at IS NOT NULL) OR
        (validation_status != 'approved')
    ),
    CHECK (easiness_factor >= 1.0 AND easiness_factor <= 5.0),
    CHECK (interval_days >= 1),
    CHECK (repetition_count >= 0),
    CHECK (likes_count >= 0),
    CHECK (downloads_count >= 0),
    CHECK (reports_count >= 0)
);