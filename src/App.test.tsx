import { render, screen,  fireEvent} from '@testing-library/react';
import App from './App';
import AdminLogin from './Components/adminLogin';
import AdminDashboard from './Components/adminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('renders login page', () => {
  render(<App />);
  const heading = screen.getByText('Admin Login');
  expect(heading).toBeInTheDocument();
});

test('rendirects to admin dashboard on successful login', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname="John Doe" userPassword="pass123"/>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Debug the DOM to verify inputs are correctly targeted
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(screen.getByTestId('fullname-input'));
  // Find and fill the username and password inputs
  // Get elements using the data-testid attributes from your component
  const usernameInput = screen.getByTestId('fullname-input').querySelector('input');;
  const passwordInput = screen.getByTestId('password-input').querySelector('input');;
  const continueButton = screen.getByTestId('continue-button');

  fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
  fireEvent.change(passwordInput, { target: { value: 'pass123' } });

  // Click the "Continue" button
  fireEvent.click(continueButton);
});
