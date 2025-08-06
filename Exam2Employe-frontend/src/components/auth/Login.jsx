import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const Login = ({ onRegisterClick, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (email === 'admin@quiz.com' && password === 'admin123') {
        onLogin({ 
          email, 
          name: 'Admin User', 
          role: 'admin' 
        });
      } else if (email === 'user@quiz.com' && password === 'user123') {
        onLogin({ 
          email, 
          name: 'Regular User', 
          role: 'user' 
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      alert('Invalid credentials. Try:\nAdmin: admin@quiz.com / admin123\nUser: user@quiz.com / user123');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login to E2E
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            <strong>Demo Credentials:</strong><br />
            Admin: admin@quiz.com / admin123<br />
            User: user@quiz.com / user123
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition-colors duration-200 shadow-sm flex items-center justify-center ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={onRegisterClick}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            disabled={isLoading}
          >
            Register now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;