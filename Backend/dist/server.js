"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = process.env.PORT;
// Enable CORS
app.use((0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
// Get all events
app.get('/events', async (req, res) => {
    res.send('Fetching events...');
    // try {
    //   const result = await pool.query('SELECT * FROM events ORDER BY date');
    //   res.json(result.rows);
    // } catch (err) {
    //   console.error('Error fetching events:', err);
    //   res.status(500).json({ error: 'Internal server error' });
    // }
});
// Get all bookings
// app.get('/bookings', async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`
//       SELECT b.*, e.title as event_title 
//       FROM bookings b 
//       JOIN events e ON b.event_id = e.id 
//       ORDER BY b.booking_date DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching bookings:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Create a new booking
// app.post('/bookings', async (req: Request, res: Response) => {
//   const { event_id, customer_name, customer_email, number_of_adults, number_of_kids } = req.body;
//   try {
// Get event prices
// const eventResult = await pool.query('SELECT adult_price, kids_price FROM events WHERE id = $1', [event_id]);
// if (eventResult.rows.length === 0) {
//   return res.status(404).json({ error: 'Event not found' });
// }
// const event = eventResult.rows[0];
// const total_amount = (number_of_adults * event.adult_price) + (number_of_kids * event.kids_price);
// Create booking
//     const result = await pool.query(
//       `INSERT INTO bookings (event_id, customer_name, customer_email, number_of_adults, number_of_kids, total_amount)
//        VALUES ($1, $2, $3, $4, $5, $6)
//        RETURNING *`,
//       [event_id, customer_name, customer_email, number_of_adults, number_of_kids, total_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating booking:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Delete a booking
// app.delete('/bookings/:id', async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [req.params.id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.json({ message: 'Booking deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting booking:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
