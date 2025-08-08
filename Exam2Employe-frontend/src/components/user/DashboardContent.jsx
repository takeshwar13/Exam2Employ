
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { getAllTests, hasUserAttemptedTest } from '../../api/testApi';

/**
 * DashboardContent component fetches and displays all available tests for the user.
 * On clicking "Start Test", user is navigated to the test page.
 * Requires user to be authenticated (JWT token in localStorage).
 */
const DashboardContent = () => {
  const [tests, setTests] = useState([]);
  const [attempted, setAttempted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  // Utility function to decode JWT payload
  function getJWTPayload(token) {
    if (!token) return null;
    const payload = token.split('.')[1];
    if (!payload) return null;
    // Add padding if needed
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    try {
      return JSON.parse(atob(padded));
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllTests(token);
        setTests(response.data);

        // Check attempt status for each test
        const status = {};
        await Promise.all(response.data.map(async (test) => {
          const res = await hasUserAttemptedTest(test.id, userId);
          status[test.id] = res.data;
        }));
        setAttempted(status);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch tests');
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [userId]);
  
  // Debug: Log JWT payload on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const payload = getJWTPayload(token);
    console.log('JWT Payload:', payload);
  }, []);

  const handleStartTest = (testId) => {
    if (attempted[testId]) {
      alert('You have already attempted this test.');
      return;
    }
    navigate(`/tests/${testId}`);
  };
  if (loading) return <div className="text-center mt-8">Loading tests...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Available Tests</h1>
      <div className="space-y-8">
        {tests.length === 0 ? (
          <div className="text-gray-600">No tests available.</div>
        ) : (
          tests.map((test) => (
            <div key={test.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title || test.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {typeof test.time === 'number' && !isNaN(test.time)
                        ? `${Math.floor(test.time)}:${(Math.round((test.time % 1) * 60)).toString().padStart(2, '0')}`
                        : 'N/A'}
                    </span>
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
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardContent;