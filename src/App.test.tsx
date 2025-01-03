import { render, screen,  fireEvent} from '@testing-library/react';
import App from './App';
import AdminLogin from './Components/adminLogin';
import AdminDashboard from './Components/adminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('renders login page', async () => {
  render(<App />);
  const heading = screen.getByText('Admin Login');
  expect(heading).toBeInTheDocument();
});

test('rendirects to admin dashboard on successful login', async () => {
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
  // eslint-disable-next-line testing-library/no-node-access
  const fullnameInput = screen.getByTestId('fullname-input').querySelector('input');
  // eslint-disable-next-line testing-library/no-node-access
  const passwordInput = screen.getByTestId('password-input').querySelector('input');
  const continueButton = screen.getByTestId('continue-button');

  // Add null checks before firing events
  if (fullnameInput && passwordInput) {
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  }

  // Click the "Continue" button
  fireEvent.click(continueButton);

  // Validate redirection
  const adminContent = await screen.findByText('Admin Dashboard');
  expect(adminContent).toBeInTheDocument();
});
