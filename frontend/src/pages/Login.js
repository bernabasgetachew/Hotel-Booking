import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/userRoutes/login', {
        email,
        password,
      });

      // Check if the response was successful (status 200)
      if (response.status === 200) {
        const data = response.data;

        // Store the token and role in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Navigate to the appropriate page based on the user role
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/guest-reservations');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center  py-12 flex justify-center items-center" style={{
      background: 'linear-gradient(to right, #5b8dff, #a6a6ff, #f6c7e2)', // Apply gradient here
    }}>
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
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
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
