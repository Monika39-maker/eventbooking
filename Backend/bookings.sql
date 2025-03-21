-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    -- event_id INTEGER REFERENCES events(id),
    customer_name VARCHAR(255) NOT NULL,
    -- customer_email VARCHAR(255) NOT NULL,
    number_of_adults INTEGER NOT NULL,
    number_of_kids INTEGER NOT NULL,
    -- total_amount DECIMAL(10,2) NOT NULL,
    -- booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (id SERIAL PRIMARY KEY, customer_name VARCHAR(255) NOT NULL,number_of_adults INTEGER NOT NULL,number_of_kids INTEGER NOT NULL);

-- Insert sample bookings for the existing events
INSERT INTO bookings (id, customer_name, number_of_adults, number_of_kids) VALUES
(1,'John Doe', 2, 1),
(2,'Sarah Johnson', 4, 2),
(3,'Mike Brown', 2, 3),
(4,'Emily Davis', 3, 0),
(5,'Jane Smith', 3, 2),
(6,'David Wilson', 5, 3),
(7,'Lisa Anderson', 2, 4),
(8,'Tom Harris', 6, 0),
(9,'Bob Wilson', 1, 2),
(10,'Mary Taylor', 4, 3),
(11,'James Martin', 2, 2),
(12,'Anna White', 3, 1);
