-- Vue pour suivre les progrès des utilisateurs dans leur apprentissage
CREATE VIEW user_progress AS
SELECT 
    u.id AS user_id,
    u.username,
    u.email,
    COUNT(f.id) AS total_flashcards,
    COUNT(DISTINCT w.id) AS unique_words_learned,
    COUNT(CASE WHEN f.created_at > NOW() - INTERVAL '7 days' THEN 1 END) AS recent_flashcards,
    COUNT(CASE WHEN f.created_at > NOW() - INTERVAL '30 days' THEN 1 END) AS monthly_flashcards,
    MIN(f.created_at) AS first_flashcard_date,
    MAX(f.created_at) AS last_activity_date,
    u.created_at AS registration_date
FROM 
    users u
LEFT JOIN 
    flashcards f ON u.id = f.user_id
LEFT JOIN 
    words w ON f.word_id = w.id
GROUP BY 
    u.id, u.username, u.email, u.created_at
ORDER BY 
    total_flashcards DESC;

-- Vue pour les mots les plus populaires
CREATE VIEW popular_words AS
SELECT 
    w.id,
    w.word,
    w.definition,
    w.pronunciation,
    COUNT(f.id) AS usage_count,
    COUNT(DISTINCT f.user_id) AS unique_users_count
FROM 
    words w
LEFT JOIN 
    flashcards f ON w.id = f.word_id
GROUP BY 
    w.id, w.word, w.definition, w.pronunciation
ORDER BY 
    usage_count DESC, unique_users_count DESC;