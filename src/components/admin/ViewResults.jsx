import React, { useState } from 'react';
import { Search, Download, Eye, TrendingUp, Users, Clock, Award } from 'lucide-react';

const ViewResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState('all');

  const testResults = [
    {
      id: 1,
      testName: 'Beginner Level Developer Test',
      participant: 'John Doe',
      email: 'john.doe@email.com',
      score: 8,
      totalQuestions: 10,
      percentage: 80,
      timeSpent: '4:30',
      completedAt: '2024-01-15 10:30',
      status: 'Passed'
    },
    {
      id: 2,
      testName: 'Junior Level Developer Test',
      participant: 'Jane Smith',
      email: 'jane.smith@email.com',
      score: 12,
      totalQuestions: 15,
      percentage: 80,
      timeSpent: '12:45',
      completedAt: '2024-01-15 11:15',
      status: 'Passed'
    },
    {
      id: 3,
      testName: 'Senior Level Developer Test',
      participant: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      score: 14,
      totalQuestions: 20,
      percentage: 70,
      timeSpent: '18:20',
      completedAt: '2024-01-15 14:22',
      status: 'Passed'
    },
    {
      id: 4,
      testName: 'Beginner Level Developer Test',
      participant: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      score: 5,
      totalQuestions: 10,
      percentage: 50,
      timeSpent: '4:45',
      completedAt: '2024-01-15 16:10',
      status: 'Failed'
    }
  ];

  const testOptions = [
    { value: 'all', label: 'All Tests' },
    { value: 'Beginner Level Developer Test', label: 'Beginner Level' },
    { value: 'Junior Level Developer Test', label: 'Junior Level' },
    { value: 'Senior Level Developer Test', label: 'Senior Level' }
  ];

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTest = selectedTest === 'all' || result.testName === selectedTest;
    return matchesSearch && matchesTest;
  });

  const totalParticipants = testResults.length;
  const averageScore = testResults.reduce((sum, result) => sum + result.percentage, 0) / totalParticipants;
  const passedCount = testResults.filter(result => result.status === 'Passed').length;
  const passRate = (passedCount / totalParticipants) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Results</h1>
        <p className="text-gray-600">View and analyze quiz performance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Participants</p>
              <p className="text-2xl font-bold text-gray-800">{totalParticipants}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-2xl font-bold text-gray-800">{averageScore.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-800">{passRate.toFixed(1)}%</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Passed</p>
              <p className="text-2xl font-bold text-green-600">{passedCount}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Failed</p>
              <p className="text-2xl font-bold text-red-600">{totalParticipants - passedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="md:w-64">
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {testOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.participant}</div>
                      <div className="text-sm text-gray-500">{result.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.testName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.score}/{result.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-500">{result.percentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 mr-1" />
                      {result.timeSpent}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.completedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      result.status === 'Passed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No results found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResults;