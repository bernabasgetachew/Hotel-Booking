import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReservationForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/guest-reservations');
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    // Get user token for authorization
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to make a reservation.');
      return;
    }

    const reservation = {
      fullName,
      phoneNumber,
      roomType,
      checkInDate,
      checkOutDate,
      paymentStatus,
      date,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/reservationRoutes',
        reservation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert('Reservation successful!');
        navigate('/guest-reservations');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 flex justify-center items-center" style={{
      background: 'linear-gradient(to right, #5b8dff, #a6a6ff, #f6c7e2)', // Apply gradient here
    }}>
      <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Make a Reservation</h2>
        
        <form onSubmit={handleReservation} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Submit Reservation
          </button>
        </form>

        <div className="mt-8">
          <button
            onClick={handleBack}
            className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
