// express backend 
import express, { Response, Request } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define Event type
interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
    description: string;
    kids_price: number;
    adult_price: number;
}

const app = express();
const port = process.env.PORT || 8000;

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/eventbooking';
const pool = new Pool({ 
    connectionString,
    ssl: {
        rejectUnauthorized: false
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

// Validate event data
const validateEvent = (input: any): input is Event => {
    const errors: string[] = [];
    
    // Check required fields
    if (!input.title || typeof input.title !== 'string') errors.push('Title is required and must be a string');
    if (!input.date || typeof input.date !== 'string' || !Date.parse(input.date)) errors.push('Valid date is required');
    if (!input.location || typeof input.location !== 'string') errors.push('Location is required and must be a string');
    if (!input.description || typeof input.description !== 'string') errors.push('Description is required and must be a string');
    
    // Validate prices
    if (typeof input.kids_price !== 'number' || input.kids_price < 0) {
        errors.push('Kids price must be a non-negative number');
    }
    if (typeof input.adult_price !== 'number' || input.adult_price < 0) {
        errors.push('Adult price must be a non-negative number');
    }

    return errors.length === 0;
};

// Get all events
app.get('/events', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query<Event>('SELECT * FROM events');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new event
app.post('/events', async (req: Request, res: Response) => {
    try {
        if (!validateEvent(req.body)) {
            return res.status(400).json({ 
                error: 'Validation failed',
                details: 'Invalid event data. Please check all required fields and data types.'
            });
        }

        const { title, date, location, description, kids_price, adult_price }: Event = req.body;

        const result = await pool.query<Event>(
            'INSERT INTO events (title, date, location, description, kids_price, adult_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, date, location, description, kids_price, adult_price]
        );

        res.status(201).json({
            message: 'Event created successfully',
            event: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ 
            error: 'Failed to create event',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Update an event
app.put('/events/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!validateEvent(req.body)) {
            return res.status(400).json({ 
                error: 'Validation failed',
                details: 'Invalid event data. Please check all required fields and data types.'
            });
        }

        const { title, date, location, description, kids_price, adult_price }: Event = req.body;

        const result = await pool.query<Event>(
            'UPDATE events SET title = $1, date = $2, location = $3, description = $4, kids_price = $5, adult_price = $6 WHERE id = $7 RETURNING *',
            [title, date, location, description, kids_price, adult_price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({
            message: 'Event updated successfully',
            event: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ 
            error: 'Failed to update event',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Delete an event
// app.delete('/events/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const result = await pool.query<Event>('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         res.json({
//             message: 'Event deleted successfully',
//             event: result.rows[0]
//         });
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         res.status(500).json({ 
//             error: 'Failed to delete event',
//             details: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
