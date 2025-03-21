-- Create events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    kids_price DECIMAL(10,2) NOT NULL,
    adult_price DECIMAL(10,2) NOT NULL
);

-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    number_of_adults INTEGER NOT NULL,
    number_of_kids INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample events
INSERT INTO events (title, date, location, description, kids_price, adult_price) VALUES
('Teej Party', '2023-08-01', 'Teej, TN', 'Come join us for a fun-filled day of music and food!', 10.00, 15.00),
('Dashain Celebration', '2023-08-02', 'Dashain, Nepal', 'Enjoy a day of music, food, and celebration!', 10.00, 15.00),
('Christmas Celebration', '2023-12-25', 'Christmas, TN', 'Let celebrate together', 10.00, 15.00);

-- Insert sample bookings
INSERT INTO bookings (event_id, customer_name, customer_email, number_of_adults, number_of_kids, total_amount) VALUES
(1, 'John Doe', 'john@example.com', 2, 1, 40.00),
(2, 'Jane Smith', 'jane@example.com', 3, 2, 65.00),
(3, 'Bob Wilson', 'bob@example.com', 1, 2, 35.00);
