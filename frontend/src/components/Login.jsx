import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
const Login = ({ onRegisterClick, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email,
      password
    });

    const data = response.data;

    // Store token (if you return one) or user info
    localStorage.setItem('user', JSON.stringify(data));
    alert('Login successful!');

    // Call the onLogin callback to update parent state
    onLogin(data);

  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('Login failed');
    }
  }
};
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            <strong>Demo Credentials:</strong><br />
            Email: admin@quiz.com<br />
            Password: admin123
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition-colors duration-200 shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Or </span>
          <button
            onClick={onRegisterClick}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            register now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;