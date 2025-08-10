import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Dashboard from './Dashboard';
import CreateTest from './CreateTest';
import ViewResults from './ViewResults';
import ManageUsers from './ManageUsers';

const AdminLayout = ({ onLogout }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar onLogout={onLogout} />
      
      <div className="pt-20 pb-8"> {/* Padding to account for fixed navbar */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/view-results" element={<ViewResults />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;