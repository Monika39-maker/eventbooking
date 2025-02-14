import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AdminLogin from './Components/adminLogin';
import AdminDashboard from './Components/adminDashboard';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';

const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

test("WHEN user is in index route(/) THEN render adminLogin component", () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByRole('heading', { name: /admin login/i })).toBeInTheDocument();
});

test("WHEN user is in admin route(/admin) THEN render adminDashboard component", () => {
  window.history.pushState({}, '', '/admin');
  render(
    <BrowserRouter future={routerFutureConfig}>
      <AdminDashboard />
    </BrowserRouter>
  );
  expect(screen.getByTestId("adminDashboard-component")).toBeInTheDocument();
});

test.only('redirects to admin dashboard on successful login', async () => {
  render(
    <MemoryRouter initialEntries={['/']} future={routerFutureConfig}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname="John Doe" userPassword="pass123" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Fill inputs and click "Continue"
  const fullnameInput = screen.getByTestId('fullname-input').querySelector('input');
  const passwordInput = screen.getByTestId('password-input').querySelector('input');
  const continueButton = screen.getByTestId('continue-button');
  console.log(process.env.REACT_APP_TEST_USERNAME, process.env.REACT_APP_TEST_PASSWORD);
  if (fullnameInput && passwordInput) {
    fireEvent.change(fullnameInput, { target: { value: process.env.REACT_APP_TEST_USERNAME || 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: process.env.REACT_APP_TEST_PASSWORD || 'pass123' } });
    fireEvent.click(continueButton);

    // Wait for navigation and dashboard to appear
    const adminDashboard = await screen.findByTestId('adminDashboard-title');
    expect(adminDashboard).toBeInTheDocument();
  } else {
    throw new Error('Input elements not found');
  }
});

test('WHEN user inputs wrong username or password in index / page THEN render message in the page', async () => {
  render(
    <MemoryRouter initialEntries={['/']} future={routerFutureConfig}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname="John Doe" userPassword="pass123" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );

  // Fill inputs and click "Continue"
  const fullnameInput = screen.getByTestId('fullname-input').querySelector('input');
  const passwordInput = screen.getByTestId('password-input').querySelector('input');
  const continueButton = screen.getByTestId('continue-button');

  if (fullnameInput && passwordInput) {
    fireEvent.change(fullnameInput, { target: { value: 'wrongusername' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(continueButton);

    const wrongCredentialMessage = screen.getByTestId('wrong-credential-message');
    expect(wrongCredentialMessage).toBeInTheDocument();
  } else {
    throw new Error('Input elements not found');
  }
});
