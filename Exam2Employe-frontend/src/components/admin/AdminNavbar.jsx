import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, BarChart2, LogOut } from 'lucide-react';

const AdminNavbar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-semibold">
        Exam2Employ
        </div>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className={`flex items-center px-3 py-2 ${
              isActive('dashboard') 
                ? 'text-blue-200 border-b-2 border-blue-200' 
                : 'text-white hover:text-blue-200'
            } transition-colors duration-200 font-medium`}
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/create-test"
            className={`flex items-center px-3 py-2 ${
              isActive('create-test') 
                ? 'text-blue-200 border-b-2 border-blue-200' 
                : 'text-white hover:text-blue-200'
            } transition-colors duration-200 font-medium`}
          >
            <FilePlus className="h-5 w-5 mr-2" />
            Create Test
          </Link>
          <Link
            to="/view-results"
            className={`flex items-center px-3 py-2 ${
              isActive('view-results') 
                ? 'text-blue-200 border-b-2 border-blue-200' 
                : 'text-white hover:text-blue-200'
            } transition-colors duration-200 font-medium`}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            View Results
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;