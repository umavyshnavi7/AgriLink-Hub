-- AgriLink Hub - Complete Database Schema

CREATE DATABASE IF NOT EXISTS agrilink;
USE agrilink;

-- ─── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('farmer','admin','expert','public') NOT NULL,
    phone      VARCHAR(20),
    address    VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Farming Tools ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tools (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    category    ENUM('Tractor','Harvester','Sprayer','Tiller','Irrigation','Other') NOT NULL,
    price       DECIMAL(10,2) NOT NULL,
    stock       INT NOT NULL DEFAULT 0,
    description TEXT,
    created_by  BIGINT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Tool Bookings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id        BIGINT NOT NULL,
    farmer_id      BIGINT NOT NULL,
    farmer_name    VARCHAR(255) NOT NULL,
    farmer_phone   VARCHAR(20) NOT NULL,
    farmer_address VARCHAR(500) NOT NULL,
    booking_date   DATE NOT NULL,
    days           INT NOT NULL DEFAULT 1,
    total_price    DECIMAL(10,2),
    status         ENUM('Pending','Confirmed','Cancelled') DEFAULT 'Pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id)   REFERENCES tools(id) ON DELETE CASCADE,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Marketplace Buyers ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS buyers (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    type        VARCHAR(100) NOT NULL,
    location    VARCHAR(255) NOT NULL,
    rating      DECIMAL(2,1) DEFAULT 0.0,
    deals       INT DEFAULT 0,
    buying      TEXT NOT NULL,
    quantity    VARCHAR(255),
    payment     VARCHAR(255),
    phone       VARCHAR(20),
    verified    BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Resources ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    title       VARCHAR(255) NOT NULL,
    category    VARCHAR(100),
    icon        VARCHAR(10),
    meta        VARCHAR(255),
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Initiatives / Schemes ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schemes (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    benefit     TEXT,
    eligibility TEXT,
    details     TEXT,
    link        VARCHAR(500),
    status      ENUM('Active','Inactive') DEFAULT 'Active',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Workshops ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshops (
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(255) NOT NULL,
    event_date   DATE,
    venue        VARCHAR(255),
    topics       TEXT,
    fee          VARCHAR(100) DEFAULT 'Free',
    status       ENUM('Registration Open','Closed','Completed') DEFAULT 'Registration Open',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Workshop Registrations ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshop_registrations (
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    workshop_id  BIGINT NOT NULL,
    user_id      BIGINT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (workshop_id, user_id)
);

-- ─── Sample Data ──────────────────────────────────────────────────────────────

-- Sample users (passwords are BCrypt hashed for 'password123')
INSERT IGNORE INTO users (name, email, password, role, phone) VALUES
('Test Farmer',  'farmer@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHi', 'farmer', '+91-9000000001'),
('Test Admin',   'admin@test.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHi', 'admin',  '+91-9000000002'),
('Test Expert',  'expert@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHi', 'expert', '+91-9000000003'),
('Public User',  'public@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHi', 'public', '+91-9000000004');

-- Sample tools
INSERT IGNORE INTO tools (name, category, price, stock, description) VALUES
('John Deere Tractor 5050D', 'Tractor',    1200.00, 3, 'Heavy-duty 50HP tractor for plowing and tilling'),
('Combine Harvester CH-200',  'Harvester',  3500.00, 2, 'Efficient combine harvester for wheat and rice'),
('Power Sprayer PS-500',      'Sprayer',     400.00, 5, 'High-pressure power sprayer for pesticides'),
('Rotary Tiller RT-100',      'Tiller',      600.00, 4, 'Soil preparation rotary tiller'),
('Drip Irrigation Kit',       'Irrigation',  500.00, 6, 'Complete drip irrigation system for 1 acre');

-- Sample buyers
INSERT IGNORE INTO buyers (name, type, location, rating, deals, buying, quantity, payment, phone, verified) VALUES
('Agri Traders Co.',       'Wholesale Buyer',    'Bangalore, Karnataka', 4.8, 250, 'Rice, Wheat, Maize, Ragi, Jowar',              '50-500 quintals',   'Within 7 days',      '+91-9876543210', TRUE),
('Fresh Vegetables Export', 'Export Company',     'Mumbai, Maharashtra',  4.9, 180, 'Tomato, Potato, Onion, Cabbage, Cauliflower',  '100-1000 kg daily', 'Immediate payment',  '+91-9876543211', TRUE),
('Organic Foods Ltd.',      'Organic Buyer',      'Delhi NCR',            5.0,  95, 'Organic Rice, Wheat, Pulses, Vegetables',      '20-200 quintals',   'Premium + Advance',  '+91-9876543212', TRUE),
('Spice Merchants',         'Spice Trader',       'Kochi, Kerala',        4.7, 320, 'Cardamom, Pepper, Turmeric, Ginger, Chili',    '10-100 kg',         'Within 3 days',      '+91-9876543213', TRUE),
('Fruit Processing Unit',   'Processing Company', 'Nashik, Maharashtra',  4.6, 150, 'Mango, Banana, Grapes, Pomegranate, Orange',   '500-5000 kg',       'Within 10 days',     '+91-9876543214', TRUE),
('Dairy & Feed Suppliers',  'Feed Buyer',         'Anand, Gujarat',       4.8, 200, 'Maize, Bajra, Jowar, Fodder crops',            '100-1000 quintals', 'Within 5 days',      '+91-9876543215', TRUE);

-- Sample schemes
INSERT IGNORE INTO schemes (title, benefit, eligibility, details, link, status) VALUES
('PM-KISAN',                              '₹6,000 per year in 3 installments',              'All landholding farmers',       'Online through PM-KISAN portal or nearest CSC', 'https://pmkisan.gov.in',                        'Active'),
('PMFBY Crop Insurance',                  'Crop insurance against natural calamities',       'Premium: 2% Kharif, 1.5% Rabi', 'Full sum insured for crop loss',                'https://pmfby.gov.in',                          'Active'),
('Kisan Credit Card (KCC)',               'Easy credit up to ₹3 lakh at 4% interest',       'All farmers with land records', 'Seeds, fertilizers, equipment purchase',        'https://www.nabard.org/content1.aspx?id=572',   'Active'),
('Soil Health Card Scheme',               'Free soil testing and nutrient recommendations',  'All farmers',                   'Every 3 years — optimize fertilizer use',       'https://soilhealth.dac.gov.in',                 'Active'),
('PM Krishi Sinchayee Yojana (PMKSY)',    'Subsidy on drip/sprinkler irrigation up to 90%', 'All categories of farmers',     'Apply through state agriculture department',    'https://pmksy.gov.in',                          'Active'),
('National Mission for Sustainable Agri', 'Training, equipment subsidy, organic support',   'All farmers',                   'Technical guidance and financial assistance',   'https://nmsa.dac.gov.in',                       'Active');

-- Sample workshops
INSERT IGNORE INTO workshops (title, event_date, venue, topics, fee, status) VALUES
('Organic Farming Workshop',       '2025-03-15', 'District Agriculture Office', 'Composting, natural pest control, certification process', 'Free', 'Registration Open'),
('Modern Irrigation Techniques',   '2025-03-20', 'Krishi Vigyan Kendra',        'Drip irrigation, water management, subsidy schemes',       'Free', 'Registration Open');
