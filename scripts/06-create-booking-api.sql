-- Create booking management functions and triggers

-- Function to generate unique booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference(booking_type VARCHAR)
RETURNS VARCHAR AS $$
BEGIN
    RETURN UPPER(booking_type) || LPAD(EXTRACT(EPOCH FROM NOW())::BIGINT::TEXT, 10, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to create a new booking
CREATE OR REPLACE FUNCTION create_booking(
    p_user_id INTEGER,
    p_booking_type VARCHAR,
    p_reference_id INTEGER,
    p_travel_date DATE,
    p_guests INTEGER,
    p_total_price DECIMAL,
    p_booking_details JSONB
)
RETURNS VARCHAR AS $$
DECLARE
    booking_ref VARCHAR;
BEGIN
    booking_ref := generate_booking_reference(p_booking_type);
    
    INSERT INTO bookings (
        user_id, booking_type, reference_id, booking_reference,
        travel_date, guests, total_price, booking_details
    ) VALUES (
        p_user_id, p_booking_type, p_reference_id, booking_ref,
        p_travel_date, p_guests, p_total_price, p_booking_details
    );
    
    RETURN booking_ref;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update available seats/rooms when booking is created
CREATE OR REPLACE FUNCTION update_availability()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_type = 'flight' THEN
        UPDATE flights 
        SET available_seats = available_seats - NEW.guests
        WHERE id = NEW.reference_id;
    ELSIF NEW.booking_type = 'hotel' THEN
        UPDATE hotel_rooms 
        SET available_rooms = available_rooms - (NEW.booking_details->>'rooms')::INTEGER
        WHERE hotel_id = NEW.reference_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_availability_trigger
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_availability();
