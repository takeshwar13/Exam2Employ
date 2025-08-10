import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Download, Eye, TrendingUp, Users, Clock, Award } from 'lucide-react';

const ViewResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState('all');

  const [testOptions, setTests] = useState([]);
  const [testResults, setResults] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [percentage, setPercentage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
  axios
    .get('http://localhost:8080/api/test', { headers })
    .then((response) => {
      const tests = response.data;
      setTests(tests);
      if (tests.length > 0) {
        setSelectedTestId(tests[0].id); // Set default selected test
        // Now trigger search immediately
        handleSearchWithTestId(tests[0].id);
      }
    })
    .catch((error) => {
      console.error('Error fetching tests:', error);
    });
}, []);


  // Search candidates based on selected test and percentage
  const handleSearchWithTestId = (testId) => {
    if (!testId) return;
    setLoading(true);

    let url = `http://localhost:8080/api/candidates/search?testId=${testId}`;
    if (percentage) {
      url += `&percentage=${percentage}`;
    }

    axios
      .get(url, { headers })
      .then((res) => {
        const enrichedResults = res.data.map((item, index) => ({
          id: index + 1, // Add unique ID
          name: item.name,
          title: item.title,
          email: item.email,
          percentage: item.percentage,
          totalQuestions: 100, // Placeholder
          status: item.percentage >= 40 ? 'Passed' : 'Failed',
        }));

        setResults(enrichedResults);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    handleSearchWithTestId(selectedTestId);
  };

  // Export data as CSV
  const handleExport = () => {
    let url = `http://localhost:8080/api/candidates/export?testId=${selectedTestId}`;
    if (percentage) {
      url += `&percentage=${percentage}`;
    }

    axios
      .get(url, { headers, responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'results.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.error('Export failed:', err);
      });
  };

  const filteredResults = testResults.filter(result => {
  const matchesSearch =
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.email.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesSearch;
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
              value={selectedTestId}
              onChange={(e) => setSelectedTestId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tests</option>
              {testOptions.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.title}
                </option>
              ))}
            </select>

          </div>
          <button
          onClick={handleSearch}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </button>

          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.email}</div>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.percentage}
                    </div>
                    <div className="text-sm text-gray-500">{result.percentage}%</div>
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