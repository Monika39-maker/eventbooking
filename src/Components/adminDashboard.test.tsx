import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from './adminDashboard';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock data that matches your backend structure
const mockEvents = [
  {
    id: 1,
    title: 'Teej Party',
    date: '2023-08-01',
    location: 'Teej, TN',
    description: 'Come join us for a fun-filled day of music and food!',
    kidsPrice: 10,
    adultPrice: 15,
  }
];

const mockBookings = [
  {
    id: 1,
    guestName: "Test Guest",
    numberOfKids: 2,
    numberOfAdults: 2,
    event: "Teej Party"
  }
];

// Mock fetch before all tests
beforeEach(() => {
  // Reset all mocks before each test
  jest.resetAllMocks();
  
  // Mock the global fetch
  global.fetch = jest.fn((url) => {
    if (url.includes('/events')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEvents),
      });
    }
    if (url.includes('/bookings')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBookings),
      });
    }
    return Promise.reject(new Error('Not found'));
  }) as jest.Mock;
});

// Clean up after all tests
afterAll(() => {
  jest.restoreAllMocks();
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      {ui}
    </BrowserRouter>
  );
};

describe('AdminDashboard Component Rendering', () => {
  beforeEach(async () => {
    renderWithRouter(<AdminDashboard />);
    // Wait for the events to be loaded
    await waitFor(() => {
      expect(screen.getByText('Teej Party')).toBeInTheDocument();
    });

  });

  test('should render the admin dashboard heading', () => {
    const heading = screen.getByText(/admin dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  test('should render the Add Event button', () => {
    const addEventText = screen.getByText(/add new event/i);
    expect(addEventText).toBeInTheDocument();
  });

  test('should render the events grid', () => {
    const eventsGrid = screen.getByTestId('events-grid');
    expect(eventsGrid).toBeInTheDocument();
  });

  test('should render event cards with all required information', () => {
    // Get all event cards
    const eventTitles = screen.getAllByTestId('event-title');
    const eventDates = screen.getAllByTestId('event-date');
    const eventLocations = screen.getAllByTestId('event-location');
    const eventPrices = screen.getAllByTestId('event-prices');

    // Check that we have at least one event
    expect(eventTitles.length).toBeGreaterThan(0);

    // Check that we have the same number of each element
    expect(eventDates.length).toBe(eventTitles.length);
    expect(eventLocations.length).toBe(eventTitles.length);
    expect(eventPrices.length).toBe(eventTitles.length);
  });

  test('should render action buttons for each event', () => {
    const editButtons = screen.getAllByText(/edit event/i);
    const viewBookingsButtons = screen.getAllByText(/view bookings/i);

    expect(editButtons.length).toBeGreaterThan(0);
    expect(viewBookingsButtons.length).toBeGreaterThan(0);
  });
});

describe('Add Event Functionality', () => {
  beforeEach(async () => {
    renderWithRouter(<AdminDashboard />);
    // Wait for initial data load
    await waitFor(() => {
      expect(screen.getByText('Teej Party')).toBeInTheDocument();
    });
    // Open the modal before each test
    const addEventButton = screen.getByTestId('add-event-button');
    fireEvent.click(addEventButton);
    // Wait for modal to be visible
    await waitFor(() => {
      expect(screen.getByTestId('add-event-modal')).toBeInTheDocument();
    });
  });

  test('should open the add event modal when Add Event button is clicked', () => {
    const modal = screen.getByTestId('add-event-modal');
    expect(modal).toBeInTheDocument();
  });

  test('should close the modal when cancel button is clicked', async () => {
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    // Check if modal is no longer in the document
    await waitFor(() => {
      expect(screen.queryByTestId('add-event-modal')).not.toBeInTheDocument();
    });
  });

  test('should add a new event when form is submitted with valid data', async () => {
    // Fill in the form
    const titleField = screen.getByTestId('title-field').querySelector('input');
    const dateField = screen.getByTestId('date-field').querySelector('input');
    const locationField = screen.getByTestId('location-field').querySelector('input');
    const kidsPriceField = screen.getByTestId('kids-price-field').querySelector('input');
    const adultPriceField = screen.getByTestId('adult-price-field').querySelector('input');

    if (titleField && dateField && locationField && kidsPriceField && adultPriceField) {
      fireEvent.change(titleField, { target: { value: 'Test Event' } });
      fireEvent.change(dateField, { target: { value: '2024-12-25' } });
      fireEvent.change(locationField, { target: { value: 'Test Location' } });
      fireEvent.change(kidsPriceField, { target: { value: '10' } });
      fireEvent.change(adultPriceField, { target: { value: '20' } });
    }

    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Verify the new event is added
    await waitFor(() => {
      const newEventTitle = screen.getByText('Test Event');
      expect(newEventTitle).toBeInTheDocument();
    });
  });

  test('should validate required fields', async () => {
    // Get all required inputs
    const titleInput = screen.getByTestId('title-field').querySelector('input');
    const dateInput = screen.getByTestId('date-field').querySelector('input');
    const locationInput = screen.getByTestId('location-field').querySelector('input');
    const kidsPriceInput = screen.getByTestId('kids-price-field').querySelector('input');
    const adultPriceInput = screen.getByTestId('adult-price-field').querySelector('input');

    // Verify required attribute
    expect(titleInput).toBeRequired();
    expect(dateInput).toBeRequired();
    expect(locationInput).toBeRequired();
    expect(kidsPriceInput).toBeRequired();
    expect(adultPriceInput).toBeRequired();

    // Try submitting with empty fields
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Verify modal is still open
    await waitFor(() => {
      expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });

    // Fill only some fields to test partial validation
    if (titleInput && dateInput) {
      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    }

    // Try submitting with partial data
    fireEvent.click(submitButton);

    // Verify modal is still open
    await waitFor(() => {
      expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });
  });
});

describe('Edit Event Functionality', () => {
  beforeEach(async () => {
    renderWithRouter(<AdminDashboard />);
    // Wait for initial data load
    await waitFor(() => {
      expect(screen.getByText('Teej Party')).toBeInTheDocument();
    });
    // Find and click the edit button
    const editButton = screen.getAllByText(/edit event/i)[0];
    fireEvent.click(editButton);
    // Wait for modal to be visible
    await waitFor(() => {
      expect(screen.getByTestId('edit-event-modal')).toBeInTheDocument();
    });
  });

  test('should open the edit event modal when Edit button is clicked', () => {
    const modal = screen.getByTestId('edit-event-modal');
    expect(modal).toBeInTheDocument();
  });

  test('should close the modal when cancel button is clicked', async () => {
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    // Check if modal is no longer in the document
    await waitFor(() => {
      expect(screen.queryByTestId('edit-event-modal')).not.toBeInTheDocument();
    });
  });

  test('The edit form should be pre-filled with the data', () => {
    const titleField = screen.getByTestId('title-field').querySelector('input');
    const dateField = screen.getByTestId('date-field').querySelector('input');
    const locationField = screen.getByTestId('location-field').querySelector('input');
    const kidsPriceField = screen.getByTestId('kids-price-field').querySelector('input');
    const adultPriceField = screen.getByTestId('adult-price-field').querySelector('input');

    expect(titleField).toHaveValue('Teej Party');
    expect(dateField).toHaveValue('2023-08-01');
    expect(locationField).toHaveValue('Teej, TN');
    expect(kidsPriceField).toHaveValue(10);
    expect(adultPriceField).toHaveValue(15);
  })

  test('should update an event when form is submitted with valid data', async () => {
    // Fill in the form
    const titleField = screen.getByTestId('title-field').querySelector('input');
    const dateField = screen.getByTestId('date-field').querySelector('input');
    const locationField = screen.getByTestId('location-field').querySelector('input');
    const kidsPriceField = screen.getByTestId('kids-price-field').querySelector('input');
    const adultPriceField = screen.getByTestId('adult-price-field').querySelector('input');

    if (titleField && dateField && locationField && kidsPriceField && adultPriceField) {
      fireEvent.change(titleField, { target: { value: 'Updated Test Event' } });
      fireEvent.change(dateField, { target: { value: '2024-12-26' } });
      fireEvent.change(locationField, { target: { value: 'Updated Test Location' } });
      fireEvent.change(kidsPriceField, { target: { value: '15' } });
      fireEvent.change(adultPriceField, { target: { value: '25' } });
    }

    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Verify the event is updated
    await waitFor(() => {
      const updatedEventTitle = screen.getByText('Updated Test Event');
      expect(updatedEventTitle).toBeInTheDocument();  
    }); 
  });
});
