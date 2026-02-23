-- AgriLink Hub Database Schema

CREATE DATABASE IF NOT EXISTS agrilink;
USE agrilink;

-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (email, password, role) VALUES
('farmer@test.com', 'password123', 'farmer'),
('expert@test.com', 'password123', 'expert'),
('admin@test.com', 'password123', 'admin'),
('public@test.com', 'password123', 'public');
