// src/components/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tests, setTests] = useState([]);

  const fetchTests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <Link
          to="/create-test"
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Create New Test
        </Link>
        <Link
          to="/add-question"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </Link>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">All Tests</h2>
      <ul className="space-y-2">
        {tests.map((test) => (
          <li
            key={test.id}
            className="border p-4 rounded shadow-md hover:shadow-lg transition duration-300"
          >
            <p className="text-lg font-semibold">{test.title}</p>
            <p className="text-sm text-gray-600">{test.description}</p>
            <p className="text-sm text-gray-800">Time Limit: {test.time} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
