-- Insert initial language levels for users

INSERT INTO user_language_levels (user_id, language_code, level, created_at, updated_at) VALUES
-- John Doe (user_id: 1) - Native English, learning French
(1, 'en', 10, NOW(), NOW()), -- Native level
(1, 'fr', 3, NOW(), NOW()),  -- Intermediate beginner French

-- Jane Smith (user_id: 2) - Native French, learning Chinese
(2, 'fr', 10, NOW(), NOW()), -- Native level
(2, 'zh', 2, NOW(), NOW()),  -- Beginner Chinese
(2, 'en', 7, NOW(), NOW()),  -- Advanced English

-- Alice Jones (user_id: 3) - Native English, learning Chinese
(3, 'en', 10, NOW(), NOW()), -- Native level
(3, 'zh', 4, NOW(), NOW()),  -- Intermediate Chinese

-- Bob Brown (user_id: 4) - Native Chinese, learning English
(4, 'zh', 10, NOW(), NOW()), -- Native level
(4, 'en', 5, NOW(), NOW()),  -- Intermediate English

-- Admin User (user_id: 5) - Native French, knows English
(5, 'fr', 10, NOW(), NOW()), -- Native level
(5, 'en', 9, NOW(), NOW()),  -- Near-native English

-- Google User (user_id: 6) - Native English, learning French
(6, 'en', 10, NOW(), NOW()), -- Native level
(6, 'fr', 1, NOW(), NOW());  -- Beginner French
