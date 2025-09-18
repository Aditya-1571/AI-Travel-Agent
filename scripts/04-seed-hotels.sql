-- Seed hotel chains
INSERT INTO hotel_chains (name, logo_url, website) VALUES
('Marriott International', '/marriott-logo.png', 'marriott.com'),
('Hilton Hotels', '/hilton-logo.png', 'hilton.com'),
('Hyatt Hotels', '/hyatt-logo.png', 'hyatt.com'),
('InterContinental Hotels Group', '/ihg-logo.png', 'ihg.com'),
('Sheraton Hotels', '/sheraton-logo.png', 'sheraton.com'),
('Four Seasons Hotels', '/four-seasons-logo.png', 'fourseasons.com')
ON CONFLICT DO NOTHING;

-- Seed hotels data
INSERT INTO hotels (chain_id, name, address, city, country, latitude, longitude, star_rating, rating, review_count, description, amenities, images, phone, email, website) VALUES
(1, 'The Ritz-Carlton New York, Central Park', '50 Central Park S, New York, NY 10019', 'New York', 'United States', 40.7677, -73.9794, 5, 4.6, 3247, 'Luxury hotel overlooking Central Park with world-class service and amenities', '["Spa", "Fitness Center", "Fine Dining", "Concierge", "Valet Parking", "Pet Friendly"]', '["/luxury-hotel-exterior.png", "/hotel-room-interior.png"]', '+1 (212) 308-9100', 'reservations@ritzcarlton.com', 'ritzcarlton.com'),

(2, 'Hilton London Paddington', '146 Praed St, London W2 1EE, UK', 'London', 'United Kingdom', 51.5156, -0.1756, 4, 4.3, 2891, 'Modern hotel near Paddington Station with excellent transport links', '["Business Center", "Fitness Center", "Restaurant", "Bar", "WiFi", "24/7 Reception"]', '["/modern-business-hotel.png", "/elegant-hotel-lobby.png"]', '+44 20 7850 0500', 'london.paddington@hilton.com', 'hilton.com'),

(3, 'Park Hyatt Tokyo', '3-7-1-2 Nishi Shinjuku, Shinjuku City, Tokyo 163-1055, Japan', 'Tokyo', 'Japan', 35.6938, 139.6917, 5, 4.8, 1567, 'Sophisticated luxury hotel with stunning city views and Japanese hospitality', '["Spa", "Pool", "Fine Dining", "Fitness Center", "Concierge", "Business Center"]', '["/luxury-hotel-exterior.png", "/hotel-amenities.png"]', '+81 3-5322-1234', 'tokyo.park@hyatt.com', 'hyatt.com'),

(6, 'Four Seasons Hotel George V Paris', '31 Av. George V, 75008 Paris, France', 'Paris', 'France', 48.8688, 2.3009, 5, 4.9, 2134, 'Iconic Parisian palace hotel steps from the Champs-Élysées', '["Michelin Star Restaurant", "Spa", "Fitness Center", "Concierge", "Valet Parking", "Pet Friendly"]', '["/luxury-hotel-exterior.png", "/hotel-restaurant.png"]', '+33 1 49 52 70 00', 'reservations.paris@fourseasons.com', 'fourseasons.com'),

(4, 'InterContinental Singapore', '80 Middle Rd, Singapore 188966', 'Singapore', 'Singapore', 1.2966, 103.8520, 5, 4.5, 3456, 'Heritage luxury hotel in the heart of Singapore with colonial charm', '["Heritage Building", "Pool", "Spa", "Multiple Restaurants", "Business Center", "Concierge"]', '["/elegant-hotel-lobby.png", "/hotel-amenities.png"]', '+65 6338 7600', 'singapore@ihg.com', 'intercontinental.com'),

(9, 'Burj Al Arab Jumeirah', 'Jumeirah St, Dubai, UAE', 'Dubai', 'United Arab Emirates', 25.1413, 55.1853, 5, 4.7, 4123, 'Iconic sail-shaped luxury hotel on a private island', '["Private Beach", "Helicopter Pad", "Multiple Restaurants", "Spa", "Butler Service", "Rolls Royce Fleet"]', '["/luxury-hotel-exterior.png", "/hotel-room-interior.png"]', '+971 4 301 7777', 'reservations@jumeirah.com', 'jumeirah.com')
ON CONFLICT DO NOTHING;

-- Seed hotel rooms
INSERT INTO hotel_rooms (hotel_id, room_type, description, max_occupancy, size_sqm, amenities, price_per_night, available_rooms) VALUES
(1, 'Deluxe Room', 'Elegant room with city or park views', 2, 35, '["King Bed", "Marble Bathroom", "City View", "WiFi", "Minibar"]', 899.00, 15),
(1, 'Central Park Suite', 'Luxurious suite overlooking Central Park', 4, 85, '["Separate Living Room", "Park View", "Butler Service", "Premium Amenities"]', 2499.00, 3),

(2, 'Standard Room', 'Comfortable room with modern amenities', 2, 28, '["Queen Bed", "Work Desk", "WiFi", "Tea/Coffee Facilities"]', 189.00, 25),
(2, 'Executive Room', 'Spacious room with executive lounge access', 2, 32, '["King Bed", "Lounge Access", "City View", "Premium WiFi"]', 289.00, 12),

(3, 'Park View Room', 'Serene room with Tokyo skyline views', 2, 45, '["King Bed", "Japanese Soaking Tub", "City View", "Premium Amenities"]', 756.00, 8),
(3, 'Park Suite', 'Expansive suite with panoramic city views', 4, 120, '["Separate Living Room", "Dining Area", "Butler Service", "Premium Views"]', 1899.00, 2),

(4, 'Superior Room', 'Classic Parisian elegance with modern comfort', 2, 40, '["King Bed", "Marble Bathroom", "Courtyard View", "Luxury Amenities"]', 1299.00, 6),
(4, 'Eiffel Tower Suite', 'Magnificent suite with Eiffel Tower views', 4, 95, '["Separate Living Room", "Eiffel Tower View", "Butler Service", "Terrace"]', 3999.00, 1)
ON CONFLICT DO NOTHING;
