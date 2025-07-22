-- Insert initial data into the flashcards table for testing and development purposes

INSERT INTO flashcards (
    user_id, 
    source_word_id, 
    target_word_id, 
    title, 
    personal_note, 
    mnemonic, 
    personal_examples, 
    tags, 
    deck_name, 
    visibility, 
    validation_status, 
    validated_by, 
    validated_at,
    likes_count,
    downloads_count,
    created_at, 
    updated_at
) VALUES
-- Flashcards de John Doe (user_id: 1) - Apprend le français
(1, 8, 1, 'Hello -> Bonjour', 'Salutation formelle en français', 'Bon + jour = good day', ARRAY['Hello, how are you? -> Bonjour, comment allez-vous?'], ARRAY['greetings', 'basic'], 'Mes premiers mots français', 'public', 'approved', 5, NOW(), 12, 8, NOW(), NOW()),
(1, 10, 3, 'Cat -> Chat', 'Mon animal préféré !', 'Chat sounds like "sha"', ARRAY['My cat is sleeping -> Mon chat dort'], ARRAY['animals', 'pets'], 'Mes premiers mots français', 'public', 'approved', 5, NOW(), 15, 12, NOW(), NOW()),
(1, 11, 4, 'Dog -> Chien', 'Attention à la prononciation', 'Chien = shee-AN', ARRAY['The dog is big -> Le chien est grand'], ARRAY['animals', 'pets'], 'Mes premiers mots français', 'private', 'draft', NULL, NULL, 0, 0, NOW(), NOW()),

-- Flashcards de Jane Smith (user_id: 2) - Apprend le chinois
(2, 1, 15, 'Bonjour -> 你好', 'Premier mot en chinois !', 'ni = you, hao = good', ARRAY['Bonjour tout le monde -> 你好大家'], ARRAY['greetings', 'chinese'], 'Chinois débutant', 'pending', 'pending_review', NULL, NULL, 0, 0, NOW(), NOW()),
(2, 3, 17, 'Chat -> 猫', 'J''adore les chats', 'Mao sounds like meow!', ARRAY['J''ai trois chats -> 我有三只猫'], ARRAY['animals', 'chinese'], 'Chinois débutant', 'private', 'draft', NULL, NULL, 0, 0, NOW(), NOW()),

-- Flashcards d'Alice Jones (user_id: 3) - Apprend le chinois
(3, 13, 20, 'Water -> 水', 'Caractère simple à retenir', 'The character looks like flowing water', ARRAY['I drink water -> 我喝水'], ARRAY['nature', 'basic'], 'Essential Chinese', 'public', 'approved', 5, NOW(), 25, 18, NOW(), NOW()),
(3, 12, 19, 'House -> 房子', 'Caractère composé intéressant', 'Fang = house, zi = suffix', ARRAY['My house is big -> 我的房子很大'], ARRAY['housing', 'daily'], 'Essential Chinese', 'public', 'approved', 5, NOW(), 18, 14, NOW(), NOW()),

-- Flashcards de Bob Brown (user_id: 4) - Apprend l'anglais
(4, 15, 8, '你好 -> Hello', '最基本的英语问候', 'Hello sounds like he-low', ARRAY['你好，你好吗？ -> Hello, how are you?'], ARRAY['greetings', 'english'], '英语学习', 'private', 'draft', NULL, NULL, 0, 0, NOW(), NOW()),
(4, 20, 13, '水 -> Water', '生活必需词汇', 'Water sounds like wo-ter', ARRAY['我喝水 -> I drink water'], ARRAY['nature', 'basic'], '英语学习', 'pending', 'pending_review', NULL, NULL, 0, 0, NOW(), NOW());