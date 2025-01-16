import { render, screen,  fireEvent} from '@testing-library/react';
import App from './App';
import AdminLogin from './Components/adminLogin';
import AdminDashboard from './Components/adminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test("WHEN user is in index route(/) THEN render adminLogin component", () => {

  window.history.pushState({}, '', '/');
  render(
    
      <App />
    
  );
  // eslint-disable-next-line testing-library/no-debugging-utils
  // screen.debug()
  expect(screen.getByText("Admin Login")).toBeInTheDocument();
});

test("WHEN user is in admin route(/admin) THEN render adminDashboard component", () => {
  window.history.pushState({},'', '/admin');
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
  expect(screen.getByTestId("adminDashboard-component")).toBeInTheDocument();
});


test('redirects to admin dashboard on successful login', async () => {
  

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname="John Doe" userPassword="pass123" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Fill inputs and click "Continue"
  // eslint-disable-next-line testing-library/no-node-access
  const fullnameInput = screen.getByTestId('fullname-input').querySelector('input');
  // eslint-disable-next-line testing-library/no-node-access
  const passwordInput = screen.getByTestId('password-input').querySelector('input');
  const continueButton = screen.getByTestId('continue-button');

  fireEvent.change(fullnameInput!, { target: { value: 'John Doe' } });
  fireEvent.change(passwordInput!, { target: { value: 'pass123' } });
  fireEvent.click(continueButton);

  const adminDashboard = await screen.findByTestId('adminDashboard-component');
  expect(adminDashboard).toBeInTheDocument();
});

test('WHEN user inputs wrong username or password in index / page THEN render message in the page', async () => {
  

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname="John Doe" userPassword="pass123" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Fill inputs and click "Continue"
  // eslint-disable-next-line testing-library/no-node-access
  const fullnameInput = screen.getByTestId('fullname-input').querySelector('input');
  // eslint-disable-next-line testing-library/no-node-access
  const passwordInput = screen.getByTestId('password-input').querySelector('input');
  const continueButton = screen.getByTestId('continue-button');

  fireEvent.change(fullnameInput!, { target: { value: 'John De' } });
  fireEvent.change(passwordInput!, { target: { value: 'pa123' } });
  fireEvent.click(continueButton);

  const wrongCredentialMessage = screen.getByTestId('wrong-credential-message');
  expect(wrongCredentialMessage).toBeInTheDocument();
});
