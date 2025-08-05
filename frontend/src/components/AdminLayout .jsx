import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Dashboard from './Dashboard';
import CreateTest from './CreateTest';
import ViewResults from './ViewResults';

const AdminLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'createTest':
        return <CreateTest />;
      case 'viewResults':
        return <ViewResults />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar 
        onLogout={onLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <div className="pt-20 pb-8"> {/* Add padding to account for fixed navbar */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminLayout;