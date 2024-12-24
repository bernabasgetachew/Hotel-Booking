import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to access admin features.');
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservationRoutes/admin', {
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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 border">Full Name</th>
                <th className="px-4 py-3 border">Phone Number</th>
                <th className="px-4 py-3 border">Room Type</th>
                <th className="px-4 py-3 border">Check-In</th>
                <th className="px-4 py-3 border">Check-Out</th>
                <th className="px-4 py-3 border">Payment Status</th>
                <th className="px-4 py-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation.id} className="text-center">
                    <td className="px-4 py-2 border">{reservation.FullName}</td>
                    <td className="px-4 py-2 border">{reservation.Phone}</td>
                    <td className="px-4 py-2 border">{reservation.roomType}</td>
                    <td className="px-4 py-2 border">{new Date(reservation.checkInDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{reservation.paymentStatus}</td>
                    <td className="px-4 py-2 border">{new Date(reservation.registrationDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 border text-center">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBack}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
