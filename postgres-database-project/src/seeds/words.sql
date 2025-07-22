-- Insert initial data into the words table for testing and development purposes

-- Mots français
INSERT INTO words (text, international_name, language_code, part_of_speech, definition, pronunciation, difficulty_level, frequency_rank, subject_tags, validated, created_by, created_at, updated_at) VALUES
('Bonjour', 'bonjour', 'fr', 'interjection', 'Salutation utilisée en français signifiant "hello" ou "good morning"', '/bon-ZHOOR/', 1, 100, ARRAY['salutations', 'politesse'], true, 5, NOW(), NOW()),
('Merci', 'merci', 'fr', 'interjection', 'Mot français pour exprimer la gratitude', '/mer-SEE/', 1, 50, ARRAY['politesse', 'gratitude'], true, 5, NOW(), NOW()),
('Chat', 'chat', 'fr', 'nom', 'Animal domestique félin', '/sha/', 2, 800, ARRAY['animaux', 'domestique'], true, 5, NOW(), NOW()),
('Chien', 'chien', 'fr', 'nom', 'Animal domestique canin', '/shee-AHN/', 2, 600, ARRAY['animaux', 'domestique'], true, 5, NOW(), NOW()),
('Maison', 'maison', 'fr', 'nom', 'Bâtiment destiné à l''habitation', '/may-ZOHN/', 3, 400, ARRAY['habitation', 'architecture'], true, 5, NOW(), NOW()),
('Eau', 'eau', 'fr', 'nom', 'Liquide transparent et incolore', '/oh/', 2, 200, ARRAY['nourriture', 'nature'], true, 5, NOW(), NOW()),
('Pain', 'pain', 'fr', 'nom', 'Aliment fait de farine pétrie et cuite', '/pan/', 2, 300, ARRAY['nourriture', 'alimentation'], true, 5, NOW(), NOW()),

-- Mots anglais
('Hello', 'hello', 'en', 'interjection', 'Common greeting in English', '/həˈloʊ/', 1, 80, ARRAY['greetings', 'politeness'], true, 5, NOW(), NOW()),
('Thank you', 'thank you', 'en', 'expression', 'Expression of gratitude in English', '/θæŋk juː/', 1, 60, ARRAY['politeness', 'gratitude'], true, 5, NOW(), NOW()),
('Cat', 'cat', 'en', 'noun', 'Domestic feline animal', '/kæt/', 2, 700, ARRAY['animals', 'pets'], true, 5, NOW(), NOW()),
('Dog', 'dog', 'en', 'noun', 'Domestic canine animal', '/dɔːɡ/', 2, 500, ARRAY['animals', 'pets'], true, 5, NOW(), NOW()),
('House', 'house', 'en', 'noun', 'Building for human habitation', '/haʊs/', 3, 350, ARRAY['housing', 'architecture'], true, 5, NOW(), NOW()),
('Water', 'water', 'en', 'noun', 'Transparent liquid essential for life', '/ˈwɔːtər/', 2, 150, ARRAY['food', 'nature'], true, 5, NOW(), NOW()),
('Bread', 'bread', 'en', 'noun', 'Food made from flour and water', '/brɛd/', 2, 250, ARRAY['food', 'nutrition'], true, 5, NOW(), NOW()),

-- Mots chinois
('你好', 'nǐ hǎo', 'zh', 'interjection', '中文问候语，相当于英语的hello', '/niː haʊ/', 1, 90, ARRAY['问候', '礼貌'], true, 5, NOW(), NOW()),
('谢谢', 'xiè xiè', 'zh', 'interjection', '表达感谢的中文词汇', '/ɕjɛ ɕjɛ/', 1, 70, ARRAY['礼貌', '感谢'], true, 5, NOW(), NOW()),
('猫', 'māo', 'zh', 'noun', '家养的猫科动物', '/maʊ/', 2, 900, ARRAY['动物', '宠物'], true, 5, NOW(), NOW()),
('狗', 'gǒu', 'zh', 'noun', '家养的犬科动物', '/ɡoʊ/', 2, 650, ARRAY['动物', '宠物'], true, 5, NOW(), NOW()),
('房子', 'fáng zi', 'zh', 'noun', '供人居住的建筑物', '/faŋ tsɨ/', 3, 450, ARRAY['住房', '建筑'], true, 5, NOW(), NOW()),
('水', 'shuǐ', 'zh', 'noun', '无色透明的液体', '/ʂweɪ/', 2, 180, ARRAY['食物', '自然'], true, 5, NOW(), NOW()),
('面包', 'miàn bāo', 'zh', 'noun', '用面粉制作的食品', '/mjɛn paʊ/', 2, 280, ARRAY['食物', '营养'], true, 5, NOW(), NOW());