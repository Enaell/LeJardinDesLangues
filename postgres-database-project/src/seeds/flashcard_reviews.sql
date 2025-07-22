-- Insert flashcard reviews (moderation history)

INSERT INTO flashcard_reviews (flashcard_id, reviewer_id, review_action, review_comment, previous_status, new_status, created_at) VALUES
-- Validation de la flashcard 1 par l'admin
(1, 5, 'approve', 'Excellent contenu, prononciation correcte', 'pending_review', 'approved', NOW() - INTERVAL '2 days'),

-- Validation de la flashcard 2 par l'admin
(2, 5, 'approve', 'Bonne flashcard pour débutants', 'pending_review', 'approved', NOW() - INTERVAL '1 day'),

-- Validation de la flashcard 6 par l'admin
(6, 5, 'approve', 'Caractère chinois bien expliqué', 'pending_review', 'approved', NOW() - INTERVAL '3 days'),

-- Validation de la flashcard 7 par l'admin
(7, 5, 'approve', 'Utile pour le vocabulaire de base', 'pending_review', 'approved', NOW() - INTERVAL '1 day');
