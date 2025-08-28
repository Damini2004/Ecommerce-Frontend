'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'seller',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await api.post('/login', formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Store the user's role

        // Redirect based on role
        if (response.data.role === 'seller') {
          router.push('/seller/dashboard');
        } else if (response.data.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (response.data.role === 'superadmin') {
          router.push('/superadmin-dashboard');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">Don't have an account? <a href="/register" className="text-blue-600 hover:underline font-semibold">Register Here</a></p>
        </div>
      </div>
    </div>
  );
}