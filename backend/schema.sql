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

-- Bartenders table (Enhanced for platform)
CREATE TABLE IF NOT EXISTS bartenders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  business_name VARCHAR(255),
  bio TEXT,
  experience_years INT,
  specialties TEXT,
  hourly_rate DECIMAL(10, 2),
  profile_image VARCHAR(500),
  cover_image VARCHAR(500),
  phone VARCHAR(50),
  location VARCHAR(255),
  service_radius INT COMMENT 'Service radius in miles',
  available BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT false COMMENT 'Whether profile is published and visible to customers',
  rating DECIMAL(3, 2) DEFAULT 0.00 COMMENT 'Average rating from reviews',
  total_bookings INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INT COMMENT 'Duration in hours',
  max_guests INT,
  includes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cocktails table
CREATE TABLE IF NOT EXISTS cocktails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Package cocktails (many-to-many relationship)
CREATE TABLE IF NOT EXISTS package_cocktails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT,
  cocktail_id INT,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
  FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  package_id INT,
  event_date DATE NOT NULL,
  event_time TIME,
  event_location TEXT,
  guest_count INT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  total_price DECIMAL(10, 2),
  deposit_paid DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- Staff assignments table
CREATE TABLE IF NOT EXISTS staff_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  bartender_id INT,
  status ENUM('assigned', 'confirmed', 'completed') DEFAULT 'assigned',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_type ENUM('deposit', 'full', 'balance') DEFAULT 'deposit',
  payment_method VARCHAR(50),
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  sender_id INT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bartender services table
CREATE TABLE IF NOT EXISTS bartender_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bartender_id INT NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INT COMMENT 'Duration in hours',
  max_guests INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE
);

-- Bartender portfolio images
CREATE TABLE IF NOT EXISTS bartender_portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bartender_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE
);

-- Bartender availability schedule
CREATE TABLE IF NOT EXISTS bartender_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bartender_id INT NOT NULL,
  day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
  start_time TIME,
  end_time TIME,
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE
);

-- Customer reviews for bartenders
CREATE TABLE IF NOT EXISTS bartender_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bartender_id INT NOT NULL,
  booking_id INT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  rating DECIMAL(3, 2) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- Bartender bookings (direct bookings with bartenders)
CREATE TABLE IF NOT EXISTS bartender_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bartender_id INT NOT NULL,
  service_id INT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  event_date DATE NOT NULL,
  event_time TIME,
  event_location TEXT,
  guest_count INT,
  duration INT COMMENT 'Duration in hours',
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  total_price DECIMAL(10, 2),
  deposit_paid DECIMAL(10, 2) DEFAULT 0,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (bartender_id) REFERENCES bartenders(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES bartender_services(id) ON DELETE SET NULL
);

