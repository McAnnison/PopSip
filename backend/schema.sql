-- DROP DATABASE IF EXISTS popsip; --uncomment if schema is changed or sample data is editted
-- Create database
CREATE DATABASE IF NOT EXISTS popsip;
USE popsip;

-- USERS TABLE (combines both customer and bartender)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    profile_image VARCHAR(500),
    user_type ENUM('customer', 'bartender', 'admin') DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- BARTENDER PROFILES (only if user_type = 'bartender')
CREATE TABLE bartender_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    business_name VARCHAR(255),
    bio TEXT,
    years_experience INT,
    hourly_rate DECIMAL(10, 2),
    location VARCHAR(255),
    service_area VARCHAR(500),
    specialties TEXT, -- Simple comma-separated values
    portfolio_images TEXT, -- Comma-separated image URLs
    is_available BOOLEAN DEFAULT TRUE,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    completed_events INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- PACKAGES (what bartenders offer)
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bartender_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'private_party', -- wedding, corporate, etc.
    price DECIMAL(10, 2) NOT NULL,
    duration_hours INT DEFAULT 1,
    max_guests INT DEFAULT 50,
    includes TEXT, -- Simple description of what's included
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bartender_id) REFERENCES bartender_profiles(id) ON DELETE CASCADE
);

-- BOOKINGS
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_number VARCHAR(50) UNIQUE,
    customer_id INT NOT NULL,
    bartender_id INT NOT NULL,
    package_id INT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_location VARCHAR(500),
    guest_count INT,
    special_requests TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_status ENUM('pending', 'deposit_paid', 'paid') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bartender_id) REFERENCES bartender_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- Simple menu customization (store as JSON in bookings)
-- We'll add a column for customized menu items
ALTER TABLE bookings ADD COLUMN menu_customizations JSON DEFAULT NULL;

-- REVIEWS
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    bartender_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    response TEXT, -- Bartender's response
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bartender_id) REFERENCES bartender_profiles(id) ON DELETE CASCADE
);

-- SIMPLE CHAT
CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- BARTENDER AVAILABILITY (simplified)
CREATE TABLE availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bartender_id INT NOT NULL,
    available_date DATE NOT NULL, -- Specific date they're available
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bartender_id) REFERENCES bartender_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_date (bartender_id, available_date)
);

-- FAVORITES
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    bartender_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bartender_id) REFERENCES bartender_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (customer_id, bartender_id)
);

-- NOTIFICATIONS (simplified)
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) DEFAULT 'system', -- booking, payment, message
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    reference_id INT, -- ID of related booking
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Sample users (password will be hashed by your app)
INSERT INTO users (email, password, full_name, phone, user_type, is_verified) VALUES
('john@email.com', 'hashed_password_here', 'John Smith', '555-0101', 'customer', TRUE),
('jane@email.com', 'hashed_password_here', 'Jane Doe', '555-0202', 'bartender', TRUE),
('mike@email.com', 'hashed_password_here', 'Mike Johnson', '555-0303', 'customer', TRUE),
('sarah@email.com', 'hashed_password_here', 'Sarah Williams', '555-0404', 'bartender', TRUE),
('admin@popsip.com', 'hashed_password_here', 'Admin User', '555-0505', 'admin', TRUE);

-- Sample bartender profiles
INSERT INTO bartender_profiles (user_id, business_name, bio, years_experience, hourly_rate, location, service_area, specialties, portfolio_images, completed_events) VALUES
(2, 'Jane\'s Cocktails', 'Professional bartender specializing in craft cocktails and weddings', 5, 50.00, 'Austin, TX', 'Austin and surrounding areas', 'craft cocktails,weddings,corporate events', 'jane1.jpg,jane2.jpg,jane3.jpg', 45),
(4, 'Sarah\'s Bar Service', 'Experienced bartender for weddings and private parties', 3, 45.00, 'Austin, TX', 'Austin, Round Rock, Cedar Park', 'weddings,private parties,holiday events', 'sarah1.jpg,sarah2.jpg', 28);

-- Sample packages
INSERT INTO packages (bartender_id, name, description, category, price, duration_hours, max_guests, includes) VALUES
(1, 'Cocktail Hour', '2 hours of professional bartending service with 3 signature cocktails', 'private_party', 250.00, 2, 30, 'Bartender, basic bar tools, 3 signature cocktails, glassware'),
(1, 'Full Event Package', 'Full event coverage with premium cocktails and mocktails', 'wedding', 500.00, 4, 50, 'Bartender, all equipment, 5 premium cocktails, mocktails, garnishes'),
(2, 'Wedding Special', 'Complete wedding bar service with customized menu', 'wedding', 600.00, 5, 100, '2 bartenders, full bar setup, 6 signature cocktails, champagne toast');

-- Sample bookings
INSERT INTO bookings (booking_number, customer_id, bartender_id, package_id, status, event_date, event_time, event_location, guest_count, total_amount, deposit_amount, payment_status, menu_customizations) VALUES
('BK-001', 1, 1, 1, 'completed', '2024-03-15', '19:00:00', '123 Main St, Austin, TX', 30, 250.00, 50.00, 'paid', '{"cocktails": ["Old Fashioned", "Mojito", "Margarita"], "special_requests": "extra limes"}'),
('BK-002', 3, 2, 3, 'confirmed', '2024-04-20', '17:00:00', '456 Oak Ave, Austin, TX', 100, 600.00, 150.00, 'deposit_paid', '{"cocktails": ["Signature Wedding Cocktail", "French 75", "Moscow Mule"], "mocktails": ["Berry Spritzer"]}');

-- Sample reviews
INSERT INTO reviews (booking_id, customer_id, bartender_id, rating, comment, response) VALUES
(1, 1, 1, 5, 'Jane was amazing! Great cocktails and professional service.', 'Thank you so much! It was a pleasure serving your party.');

-- Sample availability
INSERT INTO availability (bartender_id, available_date, is_available) VALUES
(1, '2024-04-15', TRUE),
(1, '2024-04-16', TRUE),
(1, '2024-04-17', FALSE),
(2, '2024-04-20', TRUE),
(2, '2024-04-21', TRUE);

-- Sample favorites
INSERT INTO favorites (customer_id, bartender_id) VALUES
(1, 2),
(3, 1);

-- Sample chat
INSERT INTO conversations (booking_id) VALUES (2);
INSERT INTO messages (conversation_id, sender_id, message) VALUES
(1, 3, 'Hi Sarah! Looking forward to the event. Just wanted to confirm the start time.'),
(1, 4, 'Thanks Mike! Yes, we''re confirmed for 5 PM. See you then!');

-- Sample notifications
INSERT INTO notifications (user_id, type, title, message, reference_id) VALUES
(3, 'booking', 'Booking Confirmed', 'Your booking #BK-002 has been confirmed by Sarah', 2),
(4, 'booking', 'New Booking', 'You have a new booking request from Mike', 2),
(1, 'payment', 'Payment Received', 'Your deposit payment of $50 has been received', 1);