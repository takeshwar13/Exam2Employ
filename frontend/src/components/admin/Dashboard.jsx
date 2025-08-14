// src/components/admin/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { Plus, Eye, Edit2, Trash2, Save, X, Clock, ChevronLeft } from 'lucide-react';
import { deleteTest as deleteTestApi } from '../../api/testApi';


const Dashboard = () => {
  // Delete test handler
  const handleDeleteTest = async (testId) => {
    if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
      try {

        await deleteTestApi(testId);
        await fetchTests();
      } catch (error) {
        alert('Failed to delete test: ' + (error.response?.data?.message || error.message));
      }
    }
  };
  
  // State management for tests and modal
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tests from API (preserve original API logic)
  const fetchTests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Ensure each test has a questions array for local management
      const testsWithQuestions = response.data.map(test => ({
        ...test,
        questions: test.questions || [],
      }));
      setTests(testsWithQuestions);
    } catch (error) {
      console.error('Error fetching tests:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // UI logic for modal, add, edit, delete, view
  const handleAddQuestion = (testId) => {
    setActiveTest(testId);
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleViewTest = async (testId) => {
    setActiveTest(testId);
    setViewMode('detail');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // response.data is TestDetailsDTO, use .questions property
      setTests(prevTests => prevTests.map(test =>
        test.id === testId ? { ...test, questions: response.data.questions || [] } : test
      ));
    } catch (error) {
      console.error('Error fetching questions:', error.response?.data || error.message);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async (questionData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized. Please log in.');
        return;
      }

      // Prepare payload with all required fields
      const payload = {
        id: questionData.id || undefined, // include id if exists (for update)
        questionText: questionData.text,
        optionA: questionData.optiona,
        optionB: questionData.optionb,
        optionC: questionData.optionc,
        optionD: questionData.optiond,
        correctOption: questionData.correctOption,
        testId: activeTest,
      };

      if (questionData.id) {
        // Update existing question
        console.log('Updating question with payload:', payload);
        await axios.put(
          `http://localhost:8080/api/test/question/${questionData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // Add new question
        console.log('Adding new question with payload:', payload);
        await axios.post(
          'http://localhost:8080/api/test/question',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Refresh current test's questions after successful add/update
      if (activeTest) {
        await handleViewTest(activeTest);
      } else {
        await fetchTests();
      }
      setIsModalOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      
      alert(
        'Failed to save question: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEditQuestion = (question) => {
    // Always map backend DTO fields to modal fields for editing
    setEditingQuestion({
      ...question,
      text: question.questionText || question.text || '',
      optiona: question.optionA || question.optiona || '',
      optionb: question.optionB || question.optionb || '',
      optionc: question.optionC || question.optionc || '',
      optiond: question.optionD || question.optiond || '',
      correctOption: question.correctOption || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (testId, questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/test/question/${questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh current test's questions
        if (activeTest) {
          await handleViewTest(activeTest);
        } else {
          await fetchTests();
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        if (error.response) {
          console.error('Backend response:', error.response.data);
        }
        alert('Failed to delete question.');
      }
    }
  };

  // Modal component for add/edit question
  const QuestionModal = ({ isOpen, onClose, onSave, questionToEdit }) => {
    const [question, setQuestion] = useState(
      questionToEdit || {
        text: '',
        optiona: '',
        optionb: '',
        optionc: '',
        optiond: '',
        correctOption: '',
      }
    );

    useEffect(() => {
      if (questionToEdit) {
        if (questionToEdit.options && Array.isArray(questionToEdit.options)) {
          setQuestion({
            ...questionToEdit,
            optiona: questionToEdit.optiona || '',
            optionb: questionToEdit.optionb || '',
            optionc: questionToEdit.optionc || '',
            optiond: questionToEdit.optiond || '',
          });
        } else {
          setQuestion(questionToEdit);
        }
      } else {
        setQuestion({
          text: '',
          optiona: '',
          optionb: '',
          optionc: '',
          optiond: '',
          correctOption: '',
        });
      }
    }, [questionToEdit, isOpen]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        !question.text ||
        !question.optiona ||
        !question.optionb ||
        !question.optionc ||
        !question.optiond ||
        question.correctOption === ''
      ) {
        alert('Please fill in all fields');
        return;
      }
      onSave(question);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {questionToEdit ? 'Edit Question' : 'Add New Question'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text *
              </label>
              <textarea
                value={question.text}
                onChange={e => setQuestion({ ...question, text: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter question text"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Options</h3>
              <div className="flex items-center space-x-4">
                <span className="w-8 text-sm font-medium text-gray-700">Option A</span>
                <input
                  type="text"
                  value={question.optiona || ''}
                  onChange={e => setQuestion({ ...question, optiona: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter option A"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-8 text-sm font-medium text-gray-700">Option B</span>
                <input
                  type="text"
                  value={question.optionb || ''}
                  onChange={e => setQuestion({ ...question, optionb: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter option B"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-8 text-sm font-medium text-gray-700">Option C</span>
                <input
                  type="text"
                  value={question.optionc || ''}
                  onChange={e => setQuestion({ ...question, optionc: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter option C"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-8 text-sm font-medium text-gray-700">Option D</span>
                <input
                  type="text"
                  value={question.optiond || ''}
                  onChange={e => setQuestion({ ...question, optiond: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter option D"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Option *
              </label>
              <select
                value={question.correctOption}
                onChange={e => setQuestion({ ...question, correctOption: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select correct option</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {questionToEdit ? 'Update Question' : 'Save Question'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (viewMode === 'detail') {
    const test = tests.find(t => t.id === activeTest);
    return (
      <div className="max-w-6xl mx-auto p-6 pt-20">
        <button
          onClick={handleBackToList}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Tests
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{test.time}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{test.description}</p>
            </div>
            <button
              onClick={() => handleAddQuestion(test.id)}
              className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">
            Questions ({test.questions.length})
          </h3>

          {test.questions.length > 0 ? (
            test.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {qIndex + 1}. {question.questionText}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                      title="Edit question"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(test.id, question.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                      title="Delete question"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{question.questionText}</p>
                <div className="space-y-2">
                  {['optionA', 'optionB', 'optionC', 'optionD'].map((key, oIndex) => (
                    <div
                      key={key}
                      className={`p-3 border rounded-md ${
                        question.correctOption === String.fromCharCode(65 + oIndex)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200'
                      }`}
                    >
                      {String.fromCharCode(65 + oIndex)}. {question[key]}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
              No questions added yet for this test.
            </div>
          )}
        </div>

        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuestion}
          questionToEdit={editingQuestion}
        />
      </div>
    );
  }

  // Filter tests by search term
  const filteredTests = tests.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // List view
  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search tests by name..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-8">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title}</h2>
                {test.time && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{test.time}</span>
                  </div>
                )}
                {test.description && (
                  <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                )}
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAddQuestion(test.id)}
                    className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </button>
                  <button
                    onClick={() => handleViewTest(test.id)}
                    className="flex items-center px-4 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Test
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors mt-2"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
        questionToEdit={editingQuestion}
      />
    </div>
  );
};

export default Dashboard;
