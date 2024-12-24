import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/guest-reservations');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your reservations.');
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservationRoutes/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div
      className="max-w-6xl mx-auto p-6 shadow-lg rounded-lg"
      style={{
        background: 'linear-gradient(to right, #5b8dff, #a6a6ff, #f6c7e2)', // Apply gradient here
      }}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Reservations</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.length === 0 ? (
          <div className="col-span-3 text-center text-gray-600">No reservations found.</div>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{reservation.FullName}</h3>
              <p className="text-sm text-gray-600">Phone: {reservation.Phone}</p>
              <p className="text-sm text-gray-600">Room Type: {reservation.roomType}</p>
              <p className="text-sm text-gray-600">Check-in Date: {new Date(reservation.checkInDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Check-out Date: {new Date(reservation.checkOutDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Payment Status: {reservation.paymentStatus}</p>
              <p className="text-sm text-gray-600">Reservation Date: {new Date(reservation.registrationDate).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ReservationList;
