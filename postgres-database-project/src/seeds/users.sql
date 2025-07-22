-- Insert initial data into the users table for testing and development purposes

INSERT INTO users (
    username, 
    email, 
    email_verified,
    password_hash, 
    name,
    native_language,
    target_language,
    timezone,
    preferences,
    oauth_provider,
    oauth_id,
    role,
    created_at, 
    updated_at
) VALUES
('john_doe', 'john@example.com', true, 'hashed_password_1', 'John Doe', 'en', 'fr', 'America/New_York', '{"dailyGoal": 30, "notifications": true, "theme": "light"}'::jsonb, NULL, NULL, 'user', NOW(), NOW()),
('jane_smith', 'jane@example.com', true, 'hashed_password_2', 'Jane Smith', 'fr', 'zh', 'Europe/Paris', '{"dailyGoal": 45, "notifications": true, "theme": "dark"}'::jsonb, NULL, NULL, 'user', NOW(), NOW()),
('alice_jones', 'alice@example.com', true, 'hashed_password_3', 'Alice Jones', 'en', 'zh', 'UTC', '{"dailyGoal": 20, "notifications": false, "theme": "light"}'::jsonb, NULL, NULL, 'user', NOW(), NOW()),
('bob_brown', 'bob@example.com', false, 'hashed_password_4', 'Bob Brown', 'zh', 'en', 'Asia/Shanghai', '{"dailyGoal": 60, "notifications": true, "theme": "dark"}'::jsonb, NULL, NULL, 'user', NOW(), NOW()),
('admin_user', 'admin@lejardin.com', true, 'hashed_admin_password', 'Admin User', 'fr', 'en', 'UTC', '{"dailyGoal": 0, "notifications": false, "theme": "light"}'::jsonb, NULL, NULL, 'admin', NOW(), NOW()),
-- Utilisateur OAuth Google
('google_user', 'user@gmail.com', true, NULL, 'Google User', 'en', 'fr', 'America/Los_Angeles', '{"dailyGoal": 25, "notifications": true, "theme": "light"}'::jsonb, 'google', '123456789', 'user', NOW(), NOW());