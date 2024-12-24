import React from 'react';
import { Link } from 'react-router-dom';

function GuestReservationsHome() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/guest.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to darken the background and center the content */}
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">Guest Dashboard</h2>
          <div className="mb-6">
            <Link
              to="/reservation-form"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg mr-4 mb-4 sm:mb-0 inline-block"
            >
              New Reservation
            </Link>
            <Link
              to="/reservation-list"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block"
            >
              View Reservations
            </Link>
          </div>
          <div>
            <Link
              to="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestReservationsHome;
