-- Insert flashcard translations relationships

INSERT INTO flashcard_translations (flashcard_id, translation_id, rank, personal_note, created_at) VALUES
-- Flashcard 1 (Hello -> Bonjour) utilise la traduction 8->1
(1, 8, 1, 'Traduction principale', NOW()),

-- Flashcard 2 (Cat -> Chat) utilise la traduction 10->3  
(2, 10, 1, 'Traduction exacte', NOW()),

-- Flashcard 3 (Dog -> Chien) utilise la traduction 11->4
(3, 11, 1, 'Animal domestique', NOW()),

-- Flashcard 4 (Bonjour -> 你好) utilise la traduction 1->15
(4, 1, 1, 'Salutation chinoise de base', NOW()),

-- Flashcard 5 (Chat -> 猫) utilise la traduction 3->17
(5, 3, 1, 'Animal mignon', NOW()),

-- Flashcard 6 (Water -> 水) utilise la traduction 13->20
(6, 13, 1, 'Élément essentiel', NOW()),

-- Flashcard 7 (House -> 房子) utilise la traduction 12->19
(7, 12, 1, 'Habitation', NOW()),

-- Flashcard 8 (你好 -> Hello) utilise la traduction 15->8
(8, 15, 1, 'Salutation anglaise', NOW()),

-- Flashcard 9 (水 -> Water) utilise la traduction 20->13
(9, 20, 1, 'Vocabulaire de base', NOW());
