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

