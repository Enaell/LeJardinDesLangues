CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255), -- NULL pour OAuth users
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    native_language VARCHAR(5) NOT NULL, -- Code ISO 639-1
    target_language VARCHAR(5) NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}'::jsonb,
    oauth_provider VARCHAR(20), -- 'google', 'facebook', etc.
    oauth_id VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(20) DEFAULT 'user',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes
    CONSTRAINT valid_oauth CHECK (
        (password_hash IS NOT NULL AND oauth_provider IS NULL AND oauth_id IS NULL) OR
        (password_hash IS NULL AND oauth_provider IS NOT NULL AND oauth_id IS NOT NULL)
    ),
    UNIQUE(oauth_provider, oauth_id)
);
