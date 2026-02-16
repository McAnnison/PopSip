# Database Schema for MixMaster

-- Create database
CREATE DATABASE IF NOT EXISTS mixmaster;
USE mixmaster;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'bartender', 'admin') DEFAULT 'customer',
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
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
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

-- Insert sample data
INSERT INTO packages (name, description, price, duration, max_guests, includes) VALUES
('Classic Package', 'Perfect for intimate gatherings with classic cocktails', 499.99, 3, 30, 'Professional bartender, Basic bar setup, 3 signature cocktails'),
('Premium Package', 'Elevated experience with premium spirits and custom cocktails', 899.99, 4, 50, 'Professional bartender, Premium bar setup, 5 signature cocktails, Custom menu'),
('Luxury Package', 'Ultimate cocktail experience with full service', 1499.99, 5, 100, '2 Professional bartenders, Full bar setup, Unlimited cocktails, Custom menu, Bar equipment');

INSERT INTO cocktails (name, description, ingredients, difficulty) VALUES
('Classic Margarita', 'A timeless favorite with tequila, lime, and triple sec', 'Tequila, Lime juice, Triple sec, Salt', 'easy'),
('Old Fashioned', 'A sophisticated whiskey cocktail with bitters and sugar', 'Bourbon, Sugar, Bitters, Orange peel', 'medium'),
('Mojito', 'Refreshing rum cocktail with mint and lime', 'White rum, Mint, Lime, Sugar, Soda water', 'easy'),
('Espresso Martini', 'Coffee-infused vodka cocktail', 'Vodka, Coffee liqueur, Espresso, Simple syrup', 'medium');

-- Insert sample bartender data
INSERT INTO users (name, email, password, role) VALUES
('John "The Mixologist" Smith', 'john.smith@example.com', 'hashed_password_1', 'bartender'),
('Sarah Martinez', 'sarah.martinez@example.com', 'hashed_password_2', 'bartender'),
('Mike "Cocktail King" Johnson', 'mike.johnson@example.com', 'hashed_password_3', 'bartender');

INSERT INTO bartenders (user_id, business_name, bio, experience_years, specialties, hourly_rate, phone, location, service_radius, profile_image, published, rating, total_bookings) VALUES
(1, 'Elite Mixology', 'Award-winning bartender specializing in craft cocktails and molecular mixology. Over 10 years of experience serving high-profile events.', 10, 'Craft Cocktails, Molecular Mixology, Whiskey Specialist', 75.00, '555-0101', 'Los Angeles, CA', 50, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b', true, 4.8, 127),
(2, 'Fiesta Bartending', 'Passionate about creating memorable experiences through exceptional drinks and service. Specializing in tequila and rum-based cocktails.', 7, 'Tequila Expert, Rum Cocktails, Party Events', 65.00, '555-0102', 'Miami, FL', 30, 'https://images.unsplash.com/photo-1509281373149-e957c6296406', true, 4.9, 98),
(3, 'The Cocktail Experience', 'Professional bartender bringing the party to you! Specializing in large events, corporate functions, and weddings.', 12, 'Wedding Specialist, Corporate Events, Flair Bartending', 85.00, '555-0103', 'New York, NY', 40, 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', true, 4.7, 215);

INSERT INTO bartender_services (bartender_id, service_name, description, price, duration, max_guests) VALUES
(1, 'Craft Cocktail Experience', 'Premium craft cocktails with custom menu consultation', 350.00, 3, 30),
(1, 'Molecular Mixology Show', 'Interactive cocktail experience with molecular techniques', 600.00, 4, 50),
(2, 'Tequila Tasting Party', 'Guided tequila tasting with signature margaritas', 400.00, 3, 25),
(2, 'Tropical Party Package', 'Full tropical bar setup with rum and tequila cocktails', 500.00, 4, 40),
(3, 'Wedding Bar Service', 'Complete bar service for your special day', 800.00, 6, 100),
(3, 'Corporate Event Package', 'Professional cocktail service for corporate functions', 700.00, 5, 75);

INSERT INTO bartender_reviews (bartender_id, customer_name, customer_email, rating, review_text) VALUES
(1, 'Emily Chen', 'emily@example.com', 5, 'John was absolutely amazing! His craft cocktails were the highlight of our party. Highly recommend!'),
(1, 'David Wilson', 'david@example.com', 5, 'Professional, creative, and made our event unforgettable. The molecular cocktails were a huge hit!'),
(2, 'Jessica Brown', 'jessica@example.com', 5, 'Sarah brought so much energy to our party! The margaritas were incredible and everyone loved her.'),
(3, 'Michael Davis', 'michael@example.com', 4, 'Great service for our wedding. Very professional and the bar setup looked fantastic!');
