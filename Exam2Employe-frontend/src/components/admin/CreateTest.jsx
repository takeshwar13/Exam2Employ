import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

const CreateTest = () => {
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    timeLimit: '',
    level: 'beginner'
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleTestDataChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt.trim())) {
      setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      });
      setShowQuestionForm(false);
    }
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const saveTest = () => {
    if (testData.title && testData.description && questions.length > 0) {
      alert('Test created successfully!');
      // Here you would typically save to a database
      console.log('Test Data:', testData);
      console.log('Questions:', questions);
    } else {
      alert('Please fill in all required fields and add at least one question.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Test</h1>
        <p className="text-gray-600">Design and configure your quiz</p>
      </div>

      {/* Test Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Test Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Title *
            </label>
            <input
              type="text"
              name="title"
              value={testData.title}
              onChange={handleTestDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter test title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="timeLimit"
              value={testData.timeLimit}
              onChange={handleTestDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="level"
              value={testData.level}
              onChange={handleTestDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={testData.description}
              onChange={handleTestDataChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the test content and objectives"
            />
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Questions ({questions.length})
          </h2>
          <button
            onClick={() => setShowQuestionForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </button>
        </div>

        {/* Question Form */}
        {showQuestionForm && (
          <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question *
              </label>
              <textarea
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your question"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Option {index + 1} *
                    {index === currentQuestion.correctAnswer && (
                      <span className="text-green-600 ml-1">(Correct)</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter option ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer
                </label>
                <select
                  name="correctAnswer"
                  value={currentQuestion.correctAnswer}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: parseInt(e.target.value)
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={currentQuestion.points}
                  onChange={handleQuestionChange}
                  min="1"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addQuestion}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Add Question
              </button>
              <button
                onClick={() => setShowQuestionForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {index + 1}. {question.question}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className={`${optIndex === question.correctAnswer ? 'text-green-600 font-medium' : ''}`}>
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Points: {question.points}</p>
                </div>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveTest}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Test
        </button>
      </div>
    </div>
  );
};

export default CreateTest;