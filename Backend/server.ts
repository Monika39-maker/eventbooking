// express backend 
import express, { Response } from 'express';
import cors from 'cors';
const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  kidsPrice: number;
  adultPrice: number;
}

export type Events = Event[]

export type Booking = {
  id: number;
  guestName: string;
  numberOfKids: number;
  numberOfAdults: number;
  event: string;
}

const  events: Events= [
  {
      id:1,
      title: 'Teej Party',
      date: '2023-08-01',
     
      location: 'Teej, TN',
      description: 'Come join us for a fun-filled day of music and food!',
      kidsPrice: 10.00,
      adultPrice: 15.00,

  },
  {
      id:2,
      title:'Dashain Celebration',
      date: '2023-08-02',
      location: 'Dashain, Nepal',
      description: 'Enjoy a day of music, food, and celebration!',
      kidsPrice: 10.00,
      adultPrice: 15.00,
  },
  {
      id:3,
      title:'Christmas Celebration',
      date: '2023-12-25',
      location: 'Christmas, TN',
      description: 'Let celebrate together',
      kidsPrice: 10.00,
      adultPrice: 15.00,
  }
]

const bookings: Booking[] = [
  {
    id: 1,
    guestName: 'John Doe',
    numberOfKids: 2,
    numberOfAdults: 1,
    event: 'Teej Party'
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    numberOfKids: 1,
    numberOfAdults: 2,
    event: 'Dashain Celebration'
  },
  {
    id: 3,
    guestName: 'Bob Johnson',
    numberOfKids: 0,
    numberOfAdults: 3,
    event: 'Christmas Celebration'
  }
];



// Change the endpoint to match frontend
app.get('/events', (req, res: Response) => {
  res.json(events);
});

app.get('/bookings', (req, res: Response) => {
  res.json(bookings);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
