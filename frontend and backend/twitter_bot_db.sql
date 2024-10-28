CREATE DATABASE twitter_bot_db;

USE twitter_bot_db;

CREATE TABLE reported_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    screen_name VARCHAR(255) NOT NULL,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedback_text TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
