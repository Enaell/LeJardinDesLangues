-- This file contains SQL functions that implement search logic for querying the database, enhancing data retrieval capabilities.

-- Fonction de recherche d'utilisateurs
CREATE OR REPLACE FUNCTION search_users(search_term TEXT)
RETURNS TABLE(id INT, username VARCHAR(50), email VARCHAR(100)) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.username, u.email
    FROM users u
    WHERE u.username ILIKE '%' || search_term || '%'
       OR u.email ILIKE '%' || search_term || '%';
END;
$$ LANGUAGE plpgsql;

-- Fonction de recherche de mots avec support de la recherche textuelle
CREATE OR REPLACE FUNCTION search_words(search_term TEXT)
RETURNS TABLE(id INT, word VARCHAR(255), definition TEXT, pronunciation VARCHAR(255)) AS $$
BEGIN
    RETURN QUERY
    SELECT w.id, w.word, w.definition, w.pronunciation
    FROM words w
    WHERE w.word ILIKE '%' || search_term || '%'
       OR w.definition ILIKE '%' || search_term || '%'
       OR w.pronunciation ILIKE '%' || search_term || '%'
    ORDER BY 
        CASE 
            WHEN w.word ILIKE search_term || '%' THEN 1
            WHEN w.word ILIKE '%' || search_term || '%' THEN 2
            ELSE 3
        END,
        w.word;
END;
$$ LANGUAGE plpgsql;

-- Fonction de recherche de flashcards avec les informations utilisateur et mot
CREATE OR REPLACE FUNCTION search_flashcards(search_term TEXT, user_id_param INT DEFAULT NULL)
RETURNS TABLE(
    id INT, 
    username VARCHAR(50), 
    word VARCHAR(255), 
    example TEXT, 
    notes TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.id, 
        u.username, 
        w.word, 
        f.example, 
        f.notes
    FROM flashcards f
    JOIN users u ON f.user_id = u.id
    JOIN words w ON f.word_id = w.id
    WHERE (user_id_param IS NULL OR f.user_id = user_id_param)
      AND (f.example ILIKE '%' || search_term || '%'
           OR f.notes ILIKE '%' || search_term || '%'
           OR w.word ILIKE '%' || search_term || '%'
           OR u.username ILIKE '%' || search_term || '%')
    ORDER BY f.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir les statistiques d'un utilisateur
CREATE OR REPLACE FUNCTION get_user_stats(user_id_param INT)
RETURNS TABLE(
    total_flashcards BIGINT,
    total_words_learned BIGINT,
    recent_activity_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_flashcards,
        COUNT(DISTINCT f.word_id) as total_words_learned,
        COUNT(CASE WHEN f.created_at > NOW() - INTERVAL '7 days' THEN 1 END) as recent_activity_count
    FROM flashcards f
    WHERE f.user_id = user_id_param;
END;
$$ LANGUAGE plpgsql;