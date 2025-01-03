import React from 'react';
import { render, screen,  } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  render(<App />);
  const heading = screen.getByText('Admin Login');
  expect(heading).toBeInTheDocument();
});
