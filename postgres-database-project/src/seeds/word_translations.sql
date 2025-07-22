-- Insert word translations data

-- Traductions français -> anglais
INSERT INTO word_translations (source_word_id, target_word_id, confidence_score, context, validated, created_by, created_at, updated_at) VALUES
-- Bonjour -> Hello
(1, 8, 0.95, 'greeting', true, 5, NOW(), NOW()),
-- Merci -> Thank you
(2, 9, 0.98, 'gratitude', true, 5, NOW(), NOW()),
-- Chat -> Cat
(3, 10, 1.0, 'animal', true, 5, NOW(), NOW()),
-- Chien -> Dog
(4, 11, 1.0, 'animal', true, 5, NOW(), NOW()),
-- Maison -> House
(5, 12, 0.9, 'building', true, 5, NOW(), NOW()),
-- Eau -> Water
(6, 13, 1.0, 'liquid', true, 5, NOW(), NOW()),
-- Pain -> Bread
(7, 14, 1.0, 'food', true, 5, NOW(), NOW()),

-- Traductions anglais -> français (inverses)
(8, 1, 0.95, 'greeting', true, 5, NOW(), NOW()),
(9, 2, 0.98, 'gratitude', true, 5, NOW(), NOW()),
(10, 3, 1.0, 'animal', true, 5, NOW(), NOW()),
(11, 4, 1.0, 'animal', true, 5, NOW(), NOW()),
(12, 5, 0.9, 'building', true, 5, NOW(), NOW()),
(13, 6, 1.0, 'liquid', true, 5, NOW(), NOW()),
(14, 7, 1.0, 'food', true, 5, NOW(), NOW()),

-- Traductions français -> chinois
(1, 15, 0.9, 'greeting', true, 5, NOW(), NOW()),
(2, 16, 0.95, 'gratitude', true, 5, NOW(), NOW()),
(3, 17, 1.0, 'animal', true, 5, NOW(), NOW()),
(4, 18, 1.0, 'animal', true, 5, NOW(), NOW()),
(5, 19, 0.85, 'building', true, 5, NOW(), NOW()),
(6, 20, 1.0, 'liquid', true, 5, NOW(), NOW()),
(7, 21, 0.9, 'food', true, 5, NOW(), NOW()),

-- Traductions anglais -> chinois
(8, 15, 0.9, 'greeting', true, 5, NOW(), NOW()),
(9, 16, 0.95, 'gratitude', true, 5, NOW(), NOW()),
(10, 17, 1.0, 'animal', true, 5, NOW(), NOW()),
(11, 18, 1.0, 'animal', true, 5, NOW(), NOW()),
(12, 19, 0.85, 'building', true, 5, NOW(), NOW()),
(13, 20, 1.0, 'liquid', true, 5, NOW(), NOW()),
(14, 21, 0.9, 'food', true, 5, NOW(), NOW()),

-- Traductions chinois -> français
(15, 1, 0.9, 'greeting', true, 5, NOW(), NOW()),
(16, 2, 0.95, 'gratitude', true, 5, NOW(), NOW()),
(17, 3, 1.0, 'animal', true, 5, NOW(), NOW()),
(18, 4, 1.0, 'animal', true, 5, NOW(), NOW()),
(19, 5, 0.85, 'building', true, 5, NOW(), NOW()),
(20, 6, 1.0, 'liquid', true, 5, NOW(), NOW()),
(21, 7, 0.9, 'food', true, 5, NOW(), NOW()),

-- Traductions chinois -> anglais
(15, 8, 0.9, 'greeting', true, 5, NOW(), NOW()),
(16, 9, 0.95, 'gratitude', true, 5, NOW(), NOW()),
(17, 10, 1.0, 'animal', true, 5, NOW(), NOW()),
(18, 11, 1.0, 'animal', true, 5, NOW(), NOW()),
(19, 12, 0.85, 'building', true, 5, NOW(), NOW()),
(20, 13, 1.0, 'liquid', true, 5, NOW(), NOW()),
(21, 14, 0.9, 'food', true, 5, NOW(), NOW());
