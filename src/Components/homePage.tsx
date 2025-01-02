import React from 'react';
// import ReactDOM from 'react-dom/client';
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

const events = [
  {
    title: 'Family Picnic at Greenwich Park',
    date: 'March 15, 2024',
    image: 'https://via.placeholder.com/300x200',
    description: 'A fun-filled day with games and activities for parents and kids.',
  },
  {
    title: 'Parenting Workshop',
    date: 'April 10, 2024',
    image: 'https://via.placeholder.com/300x200',
    description: 'Learn from experts about effective parenting strategies.',
  },
  {
    title: 'Kids Art Competition',
    date: 'May 20, 2024',
    image: 'https://via.placeholder.com/300x200',
    description: 'Let your kids showcase their creativity in a friendly competition.',
  },
];

const HomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Greenwich Mummies Forum
          </Typography>
          <Button color="inherit">Join Us</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome to Greenwich Mummies Forum
        </Typography>
        <Typography variant="body1" textAlign="center" gutterBottom>
          We are a charity organization dedicated to creating a supportive community for parents and their children through fun and engaging events.
        </Typography>

        <Box sx={{ py: 4 }}>
          <Typography variant="h5" gutterBottom>
            Upcoming Events
          </Typography>
          <Grid container spacing={4}>
            {events.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.date}
                    </Typography>
                    <Typography variant="body1">
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            Join Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Become a member today and be part of a vibrant community of parents who care about making a difference.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Become a Member
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default HomePage;


