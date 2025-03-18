import React, { useEffect, useState } from 'react';
import { Event } from '../data/eventsData';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventBooking = (event: Event) => {
    console.log('Event booked:', event);
    // Add your booking logic here
  };

  return (
    <Container data-testid="eventList-component">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" >
          Available Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} data-testid="event-card">
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                  </Typography>
                  <Typography>
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography>
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography>
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography data-testid={`event-adults-price-${event.id}`}>
                    <strong>Prices:</strong>
                    <br />
                    Adults: ${event.adult_price.toFixed(2)}
                    <br />
                    Kids: ${event.kids_price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    data-testid={`book-event-button-${event.id}`}
                    onClick={() => handleEventBooking(event)}
                  >
                    Book Event
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default EventList;
