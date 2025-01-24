import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Parallax } from 'react-parallax';
import Carousel from 'react-material-ui-carousel';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Carousel items
const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80",
    title: "Building Community",
    description: "Join our vibrant community of mums in Greenwich"
  },
  {
    image: "https://images.unsplash.com/photo-1602516297586-312f705402cb?auto=format&fit=crop&q=80",
    title: "Fun Activities",
    description: "Participate in exciting events and activities"
  },
  {
    image: "https://images.unsplash.com/photo-1526485856375-9110812fbf35?auto=format&fit=crop&q=80",
    title: "Support Network",
    description: "Find support and friendship in our community"
  }
];

// Activities data
const activities = [
  {
    title: "Christmas Party",
    image: "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&q=80",
    description: "Annual Christmas celebration with games, food, and Santa!"
  },
  {
    title: "Easter Egg Hunt",
    image: "https://images.unsplash.com/photo-1457301353672-324d6d14f471?auto=format&fit=crop&q=80",
    description: "Exciting Easter egg hunt adventure for kids"
  },
  {
    title: "Dance Classes",
    image: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=80",
    description: "Fun dance sessions for mums and kids"
  },
  {
    title: "Fitness Classes",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80",
    description: "Stay fit with our specialized mum-friendly fitness classes"
  }
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ background: '#fff', boxShadow: 1 }}>
        <Container>
          <Box display="flex" alignItems="center" py={2}>
            <img 
              src="https://images.unsplash.com/photo-1517840545241-b491010a8af4?auto=format&fit=crop&q=80" 
              alt="Greenwich Mummies Forum Logo"
              style={{ height: 50, marginRight: 16 }}
            />
            <Typography variant="h5" color="primary" fontWeight="bold">
              Greenwich Mummies Forum
            </Typography>
          </Box>
        </Container>
      </AppBar>

      {/* Hero Carousel */}
      <Carousel
        animation="slide"
        interval={5000}
        sx={{ minHeight: isMobile ? '300px' : '500px' }}
      >
        {carouselItems.map((item, index) => (
          <Parallax
            key={index}
            blur={0}
            bgImage={item.image}
            strength={200}
            style={{ height: isMobile ? '300px' : '500px' }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                textAlign: 'center',
                padding: 4
              }}
            >
              <Typography variant={isMobile ? 'h4' : 'h2'} mb={2}>
                {item.title}
              </Typography>
              <Typography variant="h6">
                {item.description}
              </Typography>
            </Box>
          </Parallax>
        ))}
      </Carousel>

      {/* Join Us Button */}
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          background: theme.palette.grey[100]
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled
          sx={{
            fontSize: '1.2rem',
            py: 2,
            px: 6
          }}
        >
          Join Us Now
        </Button>
      </Box>

      {/* Activities Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" mb={6}>
          Our Activities
        </Typography>
        <Grid container spacing={4}>
          {activities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={activity.image}
                  alt={activity.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {activity.title}
                  </Typography>
                  <Typography>
                    {activity.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography>info@greenwichmummies.org</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>123 Greenwich High Road, London SE10 8JA</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
            2025 Greenwich Mummies Forum. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
