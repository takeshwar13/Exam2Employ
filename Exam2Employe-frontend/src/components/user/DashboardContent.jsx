import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Clock } from 'lucide-react';

const DashboardContent = () => {
  // Sample test data
  const tests = [
    {
      id: 1,
      title: "Beginner Level Developer Test",
      time: "5 minutes 9 seconds",
      description: "Basic level questions for entry-level developers."
    },
    // ... other tests
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

  return (
    <div className="max-w-6xl mx-auto">
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
              
              {/* Updated to use Link instead of button */}
              <Link
                to={`/tests/${test.id}`}
                className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
              >
                Start Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;