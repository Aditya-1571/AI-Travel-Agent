-- Seed airlines data
INSERT INTO airlines (code, name, logo_url, country) VALUES
('AA', 'American Airlines', '/american-airlines-logo.png', 'United States'),
('DL', 'Delta Air Lines', '/delta-airlines-logo.png', 'United States'),
('UA', 'United Airlines', '/united-airlines-logo.png', 'United States'),
('BA', 'British Airways', '/british-airways-logo.png', 'United Kingdom'),
('LH', 'Lufthansa', '/lufthansa-logo.png', 'Germany'),
('AF', 'Air France', '/air-france-logo.png', 'France'),
('JL', 'Japan Airlines', '/jal-logo.png', 'Japan'),
('SQ', 'Singapore Airlines', '/singapore-airlines-logo.png', 'Singapore'),
('EK', 'Emirates', '/emirates-logo.png', 'United Arab Emirates'),
('QR', 'Qatar Airways', '/qatar-airways-logo.png', 'Qatar')
ON CONFLICT (code) DO NOTHING;

-- Seed airports data
INSERT INTO airports (code, name, city, country, latitude, longitude, timezone) VALUES
('JFK', 'John F. Kennedy International Airport', 'New York', 'United States', 40.6413, -73.7781, 'America/New_York'),
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'United States', 33.9425, -118.4081, 'America/Los_Angeles'),
('LHR', 'London Heathrow Airport', 'London', 'United Kingdom', 51.4700, -0.4543, 'Europe/London'),
('CDG', 'Charles de Gaulle Airport', 'Paris', 'France', 49.0097, 2.5479, 'Europe/Paris'),
('NRT', 'Narita International Airport', 'Tokyo', 'Japan', 35.7720, 140.3929, 'Asia/Tokyo'),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 1.3644, 103.9915, 'Asia/Singapore'),
('DXB', 'Dubai International Airport', 'Dubai', 'United Arab Emirates', 25.2532, 55.3657, 'Asia/Dubai'),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 50.0379, 8.5622, 'Europe/Berlin'),
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', -33.9399, 151.1753, 'Australia/Sydney'),
('HKG', 'Hong Kong International Airport', 'Hong Kong', 'Hong Kong', 22.3080, 113.9185, 'Asia/Hong_Kong')
ON CONFLICT (code) DO NOTHING;
