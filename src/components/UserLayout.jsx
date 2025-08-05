import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import DashboardContent from './DashboardContent';
import ResultsContent from './ResultsContent';
import TestPage from './TestPage';
// import TestPage from './TestPage'; // Import the TestPage component

const UserLayout = ({ onLogout }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <UserNavbar onLogout={onLogout} />
      
      <div className="pt-20 pb-8 px-6">
        <Routes>
          <Route path="/dashboard" element={<DashboardContent />} />
          <Route path="/results" element={<ResultsContent />} />
          <Route path="/tests/:testId" element={<TestPage />} /> {/* Added TestPage route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserLayout;