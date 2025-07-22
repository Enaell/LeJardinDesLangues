-- Insert example sentences

-- Exemples pour les mots français
INSERT INTO example_sentences (word_id, sentence, translation, language_code, validated, created_by, created_at, updated_at) VALUES
-- Bonjour
(1, 'Bonjour, comment allez-vous ?', 'Hello, how are you?', 'en', true, 5, NOW(), NOW()),
(1, 'Bonjour, comment allez-vous ?', '你好，你好吗？', 'zh', true, 5, NOW(), NOW()),

-- Merci
(2, 'Merci beaucoup pour votre aide.', 'Thank you very much for your help.', 'en', true, 5, NOW(), NOW()),
(2, 'Merci beaucoup pour votre aide.', '非常感谢您的帮助。', 'zh', true, 5, NOW(), NOW()),

-- Chat
(3, 'Mon chat dort sur le canapé.', 'My cat is sleeping on the sofa.', 'en', true, 5, NOW(), NOW()),
(3, 'Mon chat dort sur le canapé.', '我的猫在沙发上睡觉。', 'zh', true, 5, NOW(), NOW()),

-- Chien
(4, 'Le chien aime jouer dans le jardin.', 'The dog likes to play in the garden.', 'en', true, 5, NOW(), NOW()),
(4, 'Le chien aime jouer dans le jardin.', '狗喜欢在花园里玩。', 'zh', true, 5, NOW(), NOW()),

-- Exemples pour les mots anglais
-- Hello
(8, 'Hello, nice to meet you!', 'Bonjour, ravi de vous rencontrer !', 'fr', true, 5, NOW(), NOW()),
(8, 'Hello, nice to meet you!', '你好，很高兴见到你！', 'zh', true, 5, NOW(), NOW()),

-- Cat
(10, 'The cat is very cute.', 'Le chat est très mignon.', 'fr', true, 5, NOW(), NOW()),
(10, 'The cat is very cute.', '这只猫很可爱。', 'zh', true, 5, NOW(), NOW()),

-- Exemples pour les mots chinois
-- 你好
(15, '你好，很高兴认识你。', 'Hello, nice to meet you.', 'en', true, 5, NOW(), NOW()),
(15, '你好，很高兴认识你。', 'Bonjour, ravi de vous rencontrer.', 'fr', true, 5, NOW(), NOW()),

-- 猫
(17, '我家有一只白猫。', 'I have a white cat at home.', 'en', true, 5, NOW(), NOW()),
(17, '我家有一只白猫。', 'J''ai un chat blanc à la maison.', 'fr', true, 5, NOW(), NOW());
