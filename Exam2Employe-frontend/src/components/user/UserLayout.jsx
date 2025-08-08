import React, { createContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import DashboardContent from './DashboardContent';
import ResultsContent from './ResultsContent';
import TestPage from './TestPage';


export const NavbarVisibilityContext = createContext();

const UserLayout = ({ onLogout }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <NavbarVisibilityContext.Provider value={{ showNavbar, setShowNavbar }}>
      <div className="bg-gray-50 min-h-screen">
        {showNavbar && <UserNavbar onLogout={onLogout} />}
        <div className="pt-20 pb-8 px-6">
          <Routes>
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/results" element={<ResultsContent />} />
            <Route path="/tests/:testId" element={<TestPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </NavbarVisibilityContext.Provider>
  );
};

export default UserLayout;