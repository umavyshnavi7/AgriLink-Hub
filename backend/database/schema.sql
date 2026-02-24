-- AgriLink Hub Database Schema

CREATE DATABASE IF NOT EXISTS agrilink;
USE agrilink;

-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Test Farmer', 'farmer@test.com', 'password123', 'farmer'),
('Test Expert', 'expert@test.com', 'password123', 'expert'),
('Test Admin', 'admin@test.com', 'password123', 'admin'),
('Test User', 'public@test.com', 'password123', 'public');
