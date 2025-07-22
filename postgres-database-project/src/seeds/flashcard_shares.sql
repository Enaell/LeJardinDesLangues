-- Insert flashcard shares

INSERT INTO flashcard_shares (flashcard_id, shared_by, shared_with, share_type, message, created_at) VALUES
-- Partages publics des flashcards approuvées
(1, 1, NULL, 'public', 'Ma première flashcard française validée !', NOW() - INTERVAL '1 day'),
(2, 1, NULL, 'public', 'Flashcard utile pour apprendre les animaux', NOW() - INTERVAL '12 hours'),
(6, 3, NULL, 'public', 'Caractère chinois simple à retenir', NOW() - INTERVAL '2 days'),
(7, 3, NULL, 'public', 'Vocabulaire essentiel en chinois', NOW() - INTERVAL '1 day'),

-- Partages directs entre utilisateurs
(1, 1, 2, 'direct', 'Je pense que cette flashcard pourrait t''aider !', NOW() - INTERVAL '6 hours'),
(6, 3, 4, 'direct', '这个字很有用 (This character is very useful)', NOW() - INTERVAL '8 hours'),

-- Partages communautaires
(2, 1, NULL, 'community', 'Parfait pour les débutants en français', NOW() - INTERVAL '3 hours'),
(7, 3, NULL, 'community', 'Essential vocabulary for Chinese learners', NOW() - INTERVAL '5 hours');
