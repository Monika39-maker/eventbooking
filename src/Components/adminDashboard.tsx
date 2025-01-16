import events, {Event} from './data'
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';



const AdminDashboard: React.FC = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        {events.map((item: Event) => (
          <Grid key={item.id} >
            <Card>
              {/* <CardMedia component="img" height="140" image={item.image} alt={item.title} /> */}
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {item.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {item.location}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body2" color="primary">
                  Kids Price: {item.kidsPrice} | Adult Price: {item.adultPrice}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;


