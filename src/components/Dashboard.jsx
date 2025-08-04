
import React, { useState } from 'react';
import { Clock, Plus, Eye, ChevronLeft } from 'lucide-react';
import AddQuestionModal from './AddQuestionModal ';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  
  const tests = [
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
  ];

  const handleAddQuestion = (testId) => {
    setActiveTest(testId);
    setIsModalOpen(true);
  };

  const handleViewTest = (testId) => {
    setActiveTest(testId);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const handleSaveQuestion = (newQuestion) => {
    // In a real app, you would update the state or make an API call
    console.log(`Saving question for test ${activeTest}:`, newQuestion);
    setIsModalOpen(false);
    alert('Question added successfully!');
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{test.title}</h2>
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{test.time}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">{test.description}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">
            Questions ({test.questions.length})
          </h3>

          {test.questions.length > 0 ? (
            test.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {qIndex + 1}. {question.title}
                </h4>
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
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Quiz App Dashboard</h1>
      
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

      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
      />
    </div>
  );
};

export default Dashboard;