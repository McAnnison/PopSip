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

-- Bartenders table
CREATE TABLE IF NOT EXISTS bartenders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  bio TEXT,
  experience_years INT,
  specialties TEXT,
  hourly_rate DECIMAL(10, 2),
  available BOOLEAN DEFAULT true,
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
