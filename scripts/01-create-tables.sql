-- Create database schema for AI Travel Agent

-- Users table for authentication and preferences
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Airlines table
CREATE TABLE IF NOT EXISTS airlines (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    country VARCHAR(100)
);

-- Airports table
CREATE TABLE IF NOT EXISTS airports (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(50)
);

-- Flights table
CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    airline_id INTEGER REFERENCES airlines(id),
    flight_number VARCHAR(20) NOT NULL,
    departure_airport_id INTEGER REFERENCES airports(id),
    arrival_airport_id INTEGER REFERENCES airports(id),
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL,
    aircraft_type VARCHAR(50),
    price_economy DECIMAL(10, 2),
    price_business DECIMAL(10, 2),
    price_first DECIMAL(10, 2),
    available_seats INTEGER DEFAULT 0,
    stops INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hotel chains table
CREATE TABLE IF NOT EXISTS hotel_chains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    website VARCHAR(255)
);

-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    chain_id INTEGER REFERENCES hotel_chains(id),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    description TEXT,
    amenities JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    check_in_time TIME DEFAULT '15:00',
    check_out_time TIME DEFAULT '11:00',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hotel rooms table
CREATE TABLE IF NOT EXISTS hotel_rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER REFERENCES hotels(id),
    room_type VARCHAR(100) NOT NULL,
    description TEXT,
    max_occupancy INTEGER NOT NULL,
    size_sqm INTEGER,
    amenities JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    price_per_night DECIMAL(10, 2) NOT NULL,
    available_rooms INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    price_range VARCHAR(10) CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
    description TEXT,
    features JSONB DEFAULT '[]',
    menu JSONB DEFAULT '[]',
    phone VARCHAR(50),
    website VARCHAR(255),
    opening_hours JSONB DEFAULT '{}',
    images JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Places/Attractions table
CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    description TEXT,
    highlights JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    opening_hours JSONB DEFAULT '{}',
    ticket_price DECIMAL(10, 2),
    duration_hours DECIMAL(4, 2),
    best_time_to_visit TEXT,
    how_to_get_there TEXT,
    images JSONB DEFAULT '[]',
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table for tracking reservations
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    booking_type VARCHAR(50) NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'restaurant', 'place')),
    reference_id INTEGER NOT NULL, -- ID of the booked item
    booking_reference VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATE,
    guests INTEGER DEFAULT 1,
    total_price DECIMAL(10, 2),
    booking_details JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences and search history
CREATE TABLE IF NOT EXISTS user_searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    search_type VARCHAR(50) NOT NULL,
    search_params JSONB NOT NULL,
    results_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_flights_departure_airport ON flights(departure_airport_id);
CREATE INDEX IF NOT EXISTS idx_flights_arrival_airport ON flights(arrival_airport_id);
CREATE INDEX IF NOT EXISTS idx_flights_departure_time ON flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city);
CREATE INDEX IF NOT EXISTS idx_hotels_rating ON hotels(rating);
CREATE INDEX IF NOT EXISTS idx_restaurants_city ON restaurants(city);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_places_city ON places(city);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(booking_type);
