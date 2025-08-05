import React, { useState } from 'react';
import { Clock, Plus, Eye, ChevronLeft, Edit2, Trash2, Save, X } from 'lucide-react';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [tests, setTests] = useState([
    {
      id: 1,
      title: "Beginner Level Developer Test",
      time: "5 minutes 0 seconds",
      description: "Basic level questions for entry-level developers.",
      questions: [
        {
          id: 101,
          title: "HTML Basics",
          text: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language"
          ],
          correctOption: 0
        },
        {
          id: 102,
          title: "CSS Selectors",
          text: "Which selector has the highest specificity?",
          options: [
            "Class selector",
            "ID selector",
            "Element selector",
            "Universal selector"
          ],
          correctOption: 1
        }
      ]
    },
    {
      id: 2,
      title: "Junior Level Developer Test",
      time: "0 minutes 5 seconds",
      description: "Intermediate level questions for junior developers.",
      questions: [
        {
          id: 201,
          title: "JavaScript Closures",
          text: "What is a closure in JavaScript?",
          options: [
            "A function that has access to its outer function's scope",
            "A way to hide variables",
            "A method to close browser windows",
            "A type of loop"
          ],
          correctOption: 0
        }
      ]
    },
    {
      id: 3,
      title: "Senior Level Developer Test",
      time: "0 minutes 5 seconds",
      description: "Advanced level questions for senior developers.",
      questions: []
    }
  ]);

  const handleAddQuestion = (testId) => {
    setActiveTest(testId);
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleViewTest = (testId) => {
    setActiveTest(testId);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (questionData) => {
    setTests(prevTests => {
      return prevTests.map(test => {
        if (test.id === activeTest) {
          if (editingQuestion) {
            // Update existing question
            const updatedQuestions = test.questions.map(q => 
              q.id === editingQuestion.id ? { ...questionData, id: q.id } : q
            );
            return { ...test, questions: updatedQuestions };
          } else {
            // Add new question
            const newQuestion = { ...questionData, id: Date.now() };
            return { ...test, questions: [...test.questions, newQuestion] };
          }
        }
        return test;
      });
    });
    
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (testId, questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setTests(prevTests => {
        return prevTests.map(test => {
          if (test.id === testId) {
            return {
              ...test,
              questions: test.questions.filter(q => q.id !== questionId)
            };
          }
          return test;
        });
      });
    }
  };

  const QuestionModal = ({ isOpen, onClose, onSave, questionToEdit }) => {
    const [question, setQuestion] = useState(
      questionToEdit || {
        title: '',
        text: '',
        options: ['', '', '', ''],
        correctOption: 0
      }
    );

    const handleOptionChange = (index, value) => {
      const newOptions = [...question.options];
      newOptions[index] = value;
      setQuestion({ ...question, options: newOptions });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!question.title || !question.text || question.options.some(opt => !opt.trim())) {
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
                Question Title *
              </label>
              <input
                type="text"
                value={question.title}
                onChange={(e) => setQuestion({...question, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter question title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text *
              </label>
              <textarea
                value={question.text}
                onChange={(e) => setQuestion({...question, text: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter question text"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Options</h3>
              {['A', 'B', 'C', 'D'].map((option, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="w-8 text-sm font-medium text-gray-700">Option {option}</span>
                  <input
                    type="text"
                    value={question.options[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter option ${option}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Option *
              </label>
              <select
                value={question.correctOption}
                onChange={(e) => setQuestion({...question, correctOption: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
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
                    {qIndex + 1}. {question.title}
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
                
                <p className="text-gray-600 mb-4">{question.text}</p>
                
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      className={`p-3 border rounded-md ${
                        oIndex === question.correctOption
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200'
                      }`}
                    >
                      {String.fromCharCode(65 + oIndex)}. {option}
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

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        {tests.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start">
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