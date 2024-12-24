import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import GuestReservationsHome from './pages/GuestReservationsHome';
import AdminDashboard from './pages/AdminDashboard';
import ReservationForm from './pages/ReservationForm';
import ReservationList from './pages/ReservationList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/guest-reservations" 
            element={<ProtectedRoute component={GuestReservationsHome} role="guest" />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute component={AdminDashboard} role="admin" />} 
          />

          {/* Guest Reservation Pages */}
          <Route 
            path="/reservation-form" 
            element={<ProtectedRoute component={ReservationForm} role="guest" />} 
          />
          <Route 
            path="/reservation-list" 
            element={<ProtectedRoute component={ReservationList} role="guest" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
