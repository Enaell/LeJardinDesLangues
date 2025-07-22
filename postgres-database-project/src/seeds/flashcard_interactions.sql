-- Insert flashcard interactions (likes, downloads, etc.)

INSERT INTO flashcard_interactions (flashcard_id, user_id, interaction_type, reason, created_at) VALUES
-- Likes sur les flashcards publiques approuvées
(1, 2, 'like', NULL, NOW()),
(1, 3, 'like', NULL, NOW()),
(1, 4, 'like', NULL, NOW()),
(2, 2, 'like', NULL, NOW()),
(2, 4, 'like', NULL, NOW()),
(6, 1, 'like', NULL, NOW()),
(6, 2, 'like', NULL, NOW()),
(7, 1, 'like', NULL, NOW()),

-- Downloads des flashcards publiques
(1, 2, 'download', NULL, NOW()),
(1, 3, 'download', NULL, NOW()),
(2, 2, 'download', NULL, NOW()),
(6, 1, 'download', NULL, NOW()),
(6, 2, 'download', NULL, NOW()),
(7, 1, 'download', NULL, NOW()),

-- Favoris
(1, 2, 'favorite', NULL, NOW()),
(6, 1, 'favorite', NULL, NOW()),
(7, 1, 'favorite', NULL, NOW()),

-- Quelques signalements (pour tester le système de modération)
(2, 3, 'report', 'Pronunciation note might be incorrect', NOW());
