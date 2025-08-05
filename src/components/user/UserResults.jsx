import React from 'react';
import { Award, Clock } from 'lucide-react';

const UserResults = () => {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Test Results</h1>
      
      <div className="space-y-6">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{result.testName}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-2" />
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
  );
};

export default UserResults;