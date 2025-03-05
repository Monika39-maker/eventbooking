// express backend 
import express, { Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8000;

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/eventbooking';
const pool = new Pool({ 
    connectionString,
    ssl: {
        rejectUnauthorized: false // Required for some hosted PostgreSQL databases
    }
});

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Database connection error:', err));

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all events
app.get('/events', async (req, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new event
app.post('/events', async (req, res: Response) => {
    const { title, date, location, description, kids_price, adult_price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO events (title, date, location, description, kids_price, adult_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, date, location, description, kids_price, adult_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
