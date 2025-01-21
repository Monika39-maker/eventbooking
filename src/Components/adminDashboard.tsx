import events, {Event, Events} from '../data/eventsData';
import bookings, { Booking } from '../data/bookings';
import React, {useState} from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Container,
  Box, 
  Button, 
  Modal, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField
} from '@mui/material';
import Grid from '@mui/material/Grid2';




const AdminDashboard: React.FC = () => {
  const [openBookings, setOpenBookings] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<null | Event>({
    id: 0,
    title: '',
    date: '',
    location: '',
    description: '',
    kidsPrice: 0,
    adultPrice: 0,
  });
  const [addEventFormOpened, setAddEventFormOpened] = React.useState<boolean>(false);
  const [editEventFormOpened, setEditEventFormOpened] = React.useState<boolean>(false);
  const [allEvents, setAllEvents] = useState<Events>(events);
  const [formValues, setFormValues] = useState<Event>({
    id: 0,
    title: '',
    date: '',
    location: '',
    description: '',
    kidsPrice: 0,
    adultPrice: 0,
  });
  const [selectedEventTitle, setSelectedEventTitle] = React.useState<string | null>(null)

  
  const handleOpen = (eventTitle:string) => {
    setSelectedEventTitle(eventTitle);
    setOpenBookings(true);
  };

  const handleClose = () => {
    setOpenBookings(false);
    setSelectedEvent(null);
  };

  const printTable = () => {
    window.print();
  };

  const openAddEventForm = () => {
    setAddEventFormOpened(true);
  };
  const closeAddEventForm = () => {
    setAddEventFormOpened(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleAddEvent = () => {
    const newEvent: Event = {
      ...formValues,
      id: allEvents.length + 1,
    };
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    setAddEventFormOpened(false);
  };

  
  const handleEditEvent = () => {
    if (selectedEvent) {
      setAllEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, ...formValues } // Replace the matching event with updated values
            : event
        )
      );
      setEditEventFormOpened(false); // Close the modal
    }
  };
  

  const handleOpenEditEventForm = (eventTitle: string) => {
    const filterOutSelectedEvent = events.filter(event => {
      return event.title === eventTitle
    })
    
    setSelectedEvent(filterOutSelectedEvent[0]);
    setEditEventFormOpened(true);
  };

  

  const closeEditEventForm = () => {
    setEditEventFormOpened(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        {allEvents.map((item: Event) => (
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
                <Button 
                size='small' 
                onClick={() => handleOpen(item.title)} 
                variant="contained">View Bookings</Button>
                <Button size='small' variant="contained" onClick={() => handleOpenEditEventForm(item.title)}>Edit Event</Button>
              </Box>
            </Card>  
          </Grid>
        ))}
        <Card sx={{cursor:'pointer', minHeight:'250px', minWidth:'250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              {/* <CardMedia component="img" height="140" image={item.image} alt={item.title} /> */}
          <CardContent onClick={openAddEventForm}>
            <Typography variant="h6" color="primary">
                Add New Event
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* View Bookings Modal  */}
      <Modal
        open={openBookings}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80%',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Bookings for {selectedEventTitle}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Number of Kids</TableCell>
                  <TableCell>Number of Adults</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings
                  .filter((booking) => booking.event === selectedEventTitle)
                  .map((booking: Booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>{booking.numberOfKids}</TableCell>
                      <TableCell>{booking.numberOfAdults}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button variant="contained" onClick={printTable}>
              Print
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Event form Modal  */}
      <Modal
        open={addEventFormOpened}
        onClose={closeAddEventForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            width: 400,
            maxHeight:'90vh',
            borderRadius: 2,
            overflowY:'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Event
          </Typography>
          <form>
            <TextField
              label="Title of the event"
              name="title"
              fullWidth
              margin="normal"
              type='text'
              InputProps={{
                inputProps: { maxLength: 100 }, // Limit to 50 characters
              }}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Date"
              name="date"
              fullWidth
              margin="normal"
              type='date'
              // placeholder="Select a date"
              InputLabelProps={{ shrink: true }}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              type='text'              
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Description with maximum 200 characters"
              name="description"
              fullWidth
              margin="normal"
              required
              multiline
              rows={3}
              typeof='text'
              InputProps={{
                inputProps: { maxLength: 200 }, // Limit to 50 characters
              }}
              onChange={handleInputChange}
            />
            <TextField
              label="Kids Price"
              name="kidsPrice"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 }, // Prevent negative values
              }}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Adult Price"
              name="adultPrice"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 }, // Prevent negative values
              }}
              // required
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button 
              variant="outlined" 
              onClick={() => setAddEventFormOpened(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setAddEventFormOpened(false);
                  handleAddEvent();
                }}
              >
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Edit Event Form Modal  */}
      <Modal
        open={editEventFormOpened}
        onClose={closeEditEventForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            width: 400,
            maxHeight:'90vh',
            borderRadius: 2,
            overflowY:'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Event
          </Typography>
          <form>
            <TextField
              label="Title of the event"
              name="title"
              fullWidth
              margin="normal"
              type='text'
              defaultValue={selectedEvent?.title}
              InputProps={{
                inputProps: { maxLength: 100 }, // Limit to 100 characters
              }}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Date"
              name="date"
              fullWidth
              margin="normal"
              type='date'
              defaultValue={selectedEvent?.date}
              // placeholder="Select a date"
              InputLabelProps={{ shrink: true }}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              type='text' 
              defaultValue={selectedEvent?.location}             
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Description with maximum 200 characters"
              name="description"
              fullWidth
              margin="normal"
              required
              multiline
              rows={3}
              typeof='text'
              defaultValue={selectedEvent?.description}
              InputProps={{
                inputProps: { maxLength: 200 }, // Limit to 200 characters
              }}
              onChange={handleInputChange}
            />
            <TextField
              label="Kids Price"
              name="kidsPrice"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 }, // Prevent negative values
              }}
              defaultValue={selectedEvent?.kidsPrice}
              // required
              onChange={handleInputChange}
            />
            <TextField
              label="Adult Price"
              name="adultPrice"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 }, // Prevent negative values
              }}
              defaultValue={selectedEvent?.adultPrice}
              // required
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button 
              variant="outlined" 
              onClick={() => setAddEventFormOpened(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleEditEvent}
              >
                edit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;


