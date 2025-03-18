import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from './EventList';
import { BrowserRouter } from 'react-router-dom';
import events from '../data/eventsData';

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

describe('EventList Rendered correctly', () => {
    test('renders without crashing', () => {
        renderWithRouter(<EventList />);
        expect(screen.getByTestId('eventList-component')).toBeInTheDocument();
    });

    test('All the events are rendered', () => {
        renderWithRouter(<EventList />);
        const eventCards = screen.getAllByTestId('event-card');
        expect(eventCards.length).toBe(events.length);
    });

    test('All the event cards have the correct data', () => {
        renderWithRouter(<EventList />);
        events.forEach((event) => {
            const title = screen.getByText(event.title);
            const date = screen.getByText(event.date);
            const location = screen.getByText(event.location);
            const description = screen.getByText(event.description);
            const priceSection = screen.getByTestId(`event-adults-price-${event.id}`);
            const bookEventButton = screen.getByTestId(`book-event-button-${event.id}`);

            expect(title).toBeInTheDocument();
            expect(date).toBeInTheDocument();
            expect(location).toBeInTheDocument();
            expect(description).toBeInTheDocument();
            expect(priceSection).toHaveTextContent(`Adults: $${event.adult_price}`);
            expect(priceSection).toHaveTextContent(`Kids: $${event.kids_price}`);
            expect(bookEventButton).toBeInTheDocument();
        });
    });
});