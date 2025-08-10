// src/components/admin/AddQuestion.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [question, setQuestion] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });

  useEffect(() => {
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
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, []);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTestId) {
      alert('Please select a test');
      return;
    }

    const payload = {
      ...question,
      testId: selectedTestId,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/test/question', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Question added successfully');
      setQuestion({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: '',
      });
    } catch (error) {
      console.error('Error adding question:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="w-full border p-2 rounded"
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
        >
          <option value="">Select Test</option>
          {tests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="questionText"
          value={question.questionText}
          onChange={handleChange}
          placeholder="Enter question"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="optionA"
          value={question.optionA}
          onChange={handleChange}
          placeholder="Option A"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="optionB"
          value={question.optionB}
          onChange={handleChange}
          placeholder="Option B"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="optionC"
          value={question.optionC}
          onChange={handleChange}
          placeholder="Option C"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="optionD"
          value={question.optionD}
          onChange={handleChange}
          placeholder="Option D"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="correctOption"
          value={question.correctOption}
          onChange={handleChange}
          placeholder="Correct Option (A/B/C/D)"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
