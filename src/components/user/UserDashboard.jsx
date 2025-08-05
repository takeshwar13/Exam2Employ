import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, LogOut, Clock } from 'lucide-react';

const UserDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample test data
  const tests = [
    {
      id: 1,
      title: "Beginner Level Developer Test",
      time: "5 minutes 9 seconds",
      description: "Basic level questions for entry-level developers."
    },
    {
      id: 2,
      title: "Junior Level Developer Test",
      time: "0 minutes 5 seconds",
      description: "Intermediate level questions for junior developers."
    },
    {
      id: 3,
      title: "Senior Level Developer Test",
      time: "0 minutes 5 seconds",
      description: "Advanced level questions for senior developers."
    }
  ];

  // Sample results data
  const results = [
    {
      id: 1,
      testName: "Beginner Level Developer Test",
      score: "8/10",
      percentage: "80%",
      timeSpent: "4:30",
      dateCompleted: "2023-05-15"
    },
    {
      id: 2,
      testName: "Junior Level Developer Test",
      score: "12/15",
      percentage: "80%",
      timeSpent: "12:45",
      dateCompleted: "2023-06-20"
    }
  ];

  const handleStartTest = (testId) => {
    // In a real app, you would navigate to the test taking component
    alert(`Starting test ${testId}`);
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl font-semibold">
          Exam2Employ
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => handleNavigation('dashboard')}
              className={`flex items-center px-3 py-2 ${
                activeTab === 'dashboard' 
                  ? 'text-blue-200 border-b-2 border-blue-200' 
                  : 'text-white hover:text-blue-200'
              } transition-colors duration-200 font-medium`}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('results')}
              className={`flex items-center px-3 py-2 ${
                activeTab === 'results' 
                  ? 'text-blue-200 border-b-2 border-blue-200' 
                  : 'text-white hover:text-blue-200'
              } transition-colors duration-200 font-medium`}
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              View Results
            </button>
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

      {/* Main Content */}
      <div className="pt-20 pb-8 px-6"> {/* Padding to account for fixed navbar */}
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Available Tests</h1>
                <div className="space-y-8">
                  {tests.map((test) => (
                    <div key={test.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title}</h2>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{test.time}</span>
                          </div>
                          {test.description && (
                            <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleStartTest(test.id)}
                          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                        >
                          Start Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } 
          />
          
          <Route 
            path="/results" 
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Test Results</h1>
                <div className="space-y-6">
                  {results.length > 0 ? (
                    results.map((result) => (
                      <div key={result.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{result.testName}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center">
                            <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">Score</p>
                              <p className="font-medium">{result.score} ({result.percentage})</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">Time Spent</p>
                              <p className="font-medium">{result.timeSpent}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Date Completed</p>
                            <p className="font-medium">{result.dateCompleted}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center text-gray-500">
                      No test results available yet.
                    </div>
                  )}
                </div>
              </div>
            } 
          />
          
          {/* Redirect to dashboard by default */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;