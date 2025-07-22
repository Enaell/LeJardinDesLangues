-- Fonction pour mettre à jour automatiquement le timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour la table users
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Trigger pour la table words
CREATE TRIGGER update_words_updated_at
    BEFORE UPDATE ON words
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Trigger pour la table flashcards
CREATE TRIGGER update_flashcards_updated_at
    BEFORE UPDATE ON flashcards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Trigger pour la table user_language_levels
CREATE TRIGGER update_user_language_levels_updated_at
    BEFORE UPDATE ON user_language_levels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Trigger pour la table word_translations
CREATE TRIGGER update_word_translations_updated_at
    BEFORE UPDATE ON word_translations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Trigger pour la table example_sentences
CREATE TRIGGER update_example_sentences_updated_at
    BEFORE UPDATE ON example_sentences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_timestamp();

-- Fonction pour valider l'email lors de l'insertion/mise à jour d'utilisateurs
CREATE OR REPLACE FUNCTION validate_email()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', NEW.email;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour valider l'email
CREATE TRIGGER validate_user_email
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION validate_email();