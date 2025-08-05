import React from 'react';
import { BarChart2, Clock, Award } from 'lucide-react';

const ResultsContent = () => {
  // Sample results data
  const results = [
    {
      id: 1,
      testName: "Beginner Level Developer Test",
      score: "8/10",
      percentage: "80%",
      timeSpent: "4:30",
      dateCompleted: "2023-05-15",
      status: "Passed"
    },
    {
      id: 2,
      testName: "Junior Level Developer Test",
      score: "12/15",
      percentage: "80%",
      timeSpent: "12:45",
      dateCompleted: "2023-06-20",
      status: "Passed"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Test Results</h1>
      
      <div className="space-y-6">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{result.testName}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    result.status === 'Passed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center text-gray-500">
            No test results available yet. Complete a test to see your results.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsContent;