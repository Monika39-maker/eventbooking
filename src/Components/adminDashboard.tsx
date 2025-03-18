import React, {useState, useEffect} from 'react';
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
  TextField,
  Grid
} from '@mui/material';

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

const AdminDashboard: React.FC = () => {
  const [openBookings, setOpenBookings] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<null | Event>({
    id: 0,
    title: '',
    date: '',
    location: '',
    description: '',
    kidsPrice: 0,
    adultPrice: 0
  });
  const [selectedEventTitle, setSelectedEventTitle] = React.useState<string | null>(null);
  const [addEventFormOpened, setAddEventFormOpened] = React.useState<boolean>(false);
  const [editEventFormOpened, setEditEventFormOpened] = React.useState<boolean>(false);
  const [allEvents, setAllEvents] = useState<Events>([]);
  const [formValues, setFormValues] = useState<Event>({
    id: 0,
    title: '',
    date: '',
    location: '',
    description: '',
    kidsPrice: 0,
    adultPrice: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setAllEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        // Set empty array to prevent undefined errors
        setAllEvents([]);
      });
  }, []); 

  useEffect(() => {
    fetch('http://localhost:8000/bookings')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBookings(data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        // Set empty array to prevent undefined errors
        setBookings([]);
      });
  }, []); // Empty dependency array means this runs once on mount

  const handleOpen = (eventTitle:string) => {
    setSelectedEventTitle(eventTitle);
    setOpenBookings(true);
  };

  const handleClose = () => {
    setOpenBookings(false);
    setSelectedEventTitle(null);
  };


  const openAddEventForm = () => {
    setAddEventFormOpened(true);
  };

  const closeAddEventForm = () => {
    setAddEventFormOpened(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      // Convert date from MM/DD/YYYY to YYYY-MM-DD format
      const dateParts = value.split('/');
      if (dateParts.length === 3) {
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        const formattedDate = `${year}-${month}-${day}`;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: formattedDate,
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleAddEvent = () => {
    // Check if all required fields are filled
    if (!formValues.title || !formValues.date || !formValues.location || 
        formValues.kidsPrice <= 0 || formValues.adultPrice <= 0) {
      return; // Don't close modal or add event if validation fails
    }

    const newEvent: Event = {
      ...formValues,
      id: allEvents.length + 1,
    };
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    setAddEventFormOpened(false);
    // Reset form values
    setFormValues({
      id: 0,
      title: '',
      date: '',
      location: '',
      description: '',
      kidsPrice: 0,
      adultPrice: 0,
    });
  };

  const handleOpenEditEventForm = (eventTitle: string) => {
    const filterOutSelectedEvent = allEvents.filter(event => {
      return event.title === eventTitle
    });
    
    setSelectedEvent(filterOutSelectedEvent[0]);
    setFormValues(filterOutSelectedEvent[0]);
    setEditEventFormOpened(true);
  };

  const closeEditEventForm = () => {
    setEditEventFormOpened(false);
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

  return (
    <div data-testid="adminDashboard-component">
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom data-testid="adminDashboard-title">
          Admin Dashboard
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Events
        </Typography>

        <Grid container spacing={4} data-testid="events-grid">
          {allEvents.map((item: Event) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card role="article">
                <CardContent>
                  <Typography variant="h6" data-testid="event-title">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" data-testid="event-date">
                    Date: {item.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" data-testid="event-location">
                    Location: {item.location}
                  </Typography>
                  <Typography variant="body2" data-testid="event-description">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="primary" data-testid="event-prices">
                    Kids Price: {item.kidsPrice} | Adult Price: {item.adultPrice}
                  </Typography>
                </CardContent>
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'space-between', justifyContent:'space-between', margin:'15px'}}>
                  <Button 
                    size='small' 
                    onClick={() => handleOpen(item.title)} 
                    variant="contained"
                    data-testid="view-bookings-button"
                  >
                    View Bookings
                  </Button>
                  <Button 
                    data-testid="edit-event-button" 
                    size='small' 
                    variant="contained" 
                    onClick={() => handleOpenEditEventForm(item.title)}
                  >
                    Edit Event
                  </Button>
                </Box>
              </Card>  
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{cursor:'pointer', minHeight:'250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <CardContent onClick={openAddEventForm} data-testid="add-event-button">
                <Typography variant="h6" color="primary">
                    Add New Event
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* View Bookings Modal */}
        <Modal
          open={openBookings}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-testid="view-bookings-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80%',
          }}>
            <Typography variant="h6" gutterBottom>
              Bookings for {selectedEventTitle}
            </Typography>

            <TableContainer component={Paper}>
              <Table data-testid="bookings-table">
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
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.guestName}</TableCell>
                        <TableCell>{booking.numberOfKids}</TableCell>
                        <TableCell>{booking.numberOfAdults}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>

        {/* Add Event Form Modal */}
        <Modal
          open={addEventFormOpened}
          onClose={closeAddEventForm}
          aria-labelledby="add-event-modal-title"
          data-testid="add-event-modal"
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
              width: 400,
              maxHeight:'90vh',
              borderRadius: 2,
              overflowY:'auto'
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom data-testid="modal-title">
              Add New Event
            </Typography>
            <form data-testid="add-event-form">
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                margin="normal"
                required
                data-testid="title-field"
              />
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formValues.date}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                data-testid="date-field"
              />
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                margin="normal"
                required
                data-testid="location-field"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
                data-testid="description-field"
              />
              <TextField
                fullWidth
                label="Kids Price"
                name="kidsPrice"
                type="number"
                value={formValues.kidsPrice}
                onChange={handleInputChange}
                margin="normal"
                required
                data-testid="kids-price-field"
              />
              <TextField
                fullWidth
                label="Adult Price"
                name="adultPrice"
                type="number"
                value={formValues.adultPrice}
                onChange={handleInputChange}
                margin="normal"
                required
                data-testid="adult-price-field"
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={closeAddEventForm} data-testid="cancel-button">
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddEvent} 
                  variant="contained" 
                  data-testid="submit-button"
                >
                  Add Event
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        {/* Edit Event Form Modal */}
        <Modal
          open={editEventFormOpened}
          onClose={closeEditEventForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-testid="edit-event-modal"
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
            <Typography variant="h6" gutterBottom data-testid="modal-title">
              Edit Event
            </Typography>
            <form>
              <TextField
                label="Title of the event"
                name="title"
                fullWidth
                margin="normal"
                type='text'
                value={formValues.title}
                InputProps={{
                  inputProps: { maxLength: 100 }, // Limit to 100 characters
                }}
                onChange={handleInputChange}
                data-testid="title-field"
              />
              <TextField
                label="Date"
                name="date"
                fullWidth
                margin="normal"
                type='date'
                value={formValues.date}
                InputLabelProps={{ shrink: true }}
                onChange={handleInputChange}
                data-testid="date-field"
              />
              <TextField
                label="Location"
                name="location"
                fullWidth
                margin="normal"
                type='text' 
                value={formValues.location}             
                onChange={handleInputChange}
                data-testid="location-field"
              />
              <TextField
                label="Description with maximum 200 characters"
                name="description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                typeof='text'
                value={formValues.description}
                InputProps={{
                  inputProps: { maxLength: 200 }, // Limit to 200 characters
                }}
                onChange={handleInputChange}
                data-testid="description-field"
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
                value={formValues.kidsPrice}
                onChange={handleInputChange}
                data-testid="kids-price-field"
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
                value={formValues.adultPrice}
                onChange={handleInputChange}
                data-testid="adult-price-field"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={closeEditEventForm}
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEditEvent}
                  data-testid="submit-button"
                >
                  Edit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard;
