import events, {Event} from '../data/eventsData'
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Container, Box, Button, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';



const AdminDashboard: React.FC = () => {
  const [openBookings, setOpenBookings] = React.useState(false);
  const handleOpen = () => setOpenBookings(true);
  const handleClose = () => setOpenBookings(false);
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
              <Box sx={{display:'flex', flexDirection:'row', alignItems:'space-between', justifyContent:'space-between', margin:'15px'}}>
                <Button size='small' onClick={handleOpen} variant="contained">View Bookings</Button>
                <Button size='small' variant="contained">Edit Event</Button>
              </Box>
            </Card>

            
          </Grid>
        ))}
        <Card>
              {/* <CardMedia component="img" height="140" image={item.image} alt={item.title} /> */}
          <CardContent sx={{cursor:'pointer'}}>
            + Add Event
          </CardContent>
        </Card>
      </Grid>
      <Modal
  open={openBookings}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box >
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal>
    </Container>
  );
};

export default AdminDashboard;


