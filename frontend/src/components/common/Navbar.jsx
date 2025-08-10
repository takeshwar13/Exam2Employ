import React from 'react';

const Navbar = ({ onLoginClick, onSignUpClick, activeForm }) => {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-semibold">
          Exam2Employ
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onSignUpClick}
            className={`px-4 py-2 transition-colors duration-200 font-medium ${
              activeForm === 'signup' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-white hover:text-blue-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={onLoginClick}
            className={`px-4 py-2 transition-colors duration-200 font-medium ${
              activeForm === 'login' 
                ? 'text-blue-300 border-b-2 border-blue-300' 
                : 'text-white hover:text-blue-200'
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;