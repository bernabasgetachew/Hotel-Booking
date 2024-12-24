import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/home.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-opacity-60 bg-black">
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 sm:mt-20">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Empathy Hotel</h1> {/* Hotel Name */}
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome to Online Booking</h2>
          <div className="text-center">
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 mb-4 sm:mb-0">
              Sign Up
            </Link>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
