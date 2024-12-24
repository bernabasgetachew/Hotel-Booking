import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Signup function triggered');

    try {
      // Make the POST request using Axios
      const response = await axios.post('http://localhost:5000/api/userRoutes/signup', {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {
        // Handle success
        alert('Signup successful! Please log in.');
        console.log(response.data);
        navigate('/login');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 flex justify-center items-center" style={{
      background: 'linear-gradient(to right, #5b8dff, #a6a6ff, #f6c7e2)', // Apply gradient here
    }}>
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Sign Up</h2>

        <div className="flex justify-start mb-6">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Home
          </Link>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
