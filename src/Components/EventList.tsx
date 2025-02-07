import React from 'react';
import events, { Event } from '../data/eventsData';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';

const EventList: React.FC = () => {
  const handleEventBooking = (event: Event) => {
    console.log('Event booked:', event);
    // Add your booking logic here
  };

  return (
    <Container data-testid="eventList-component" >
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
                    Adults: ${event.adultPrice}
                    <br />
                    Kids: ${event.kidsPrice}
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
