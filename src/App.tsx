import './App.css';
import AdminLogin from './Components/adminLogin';
import AdminDashboard from './Components/adminDashboard';
import HomePage from './Components/homePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const data = {
  fullname: 'John Doe',
  password: 'pass123'
}

function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Routes>
        <Route path="/" element={<AdminLogin userFullname={data.fullname} userPassword={data.password}/>} />
        <Route path="/admin" element={<AdminDashboard />} />  
        <Route path="/home" element={<HomePage />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
