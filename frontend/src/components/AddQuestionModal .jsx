import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddQuestionModal = ({ isOpen, onClose, onSave }) => {
  const [question, setQuestion] = useState({
    title: '',
    text: '',
    options: ['', '', '', ''],
    correctOption: 0
  });

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
    // Reset form after save
    setQuestion({
      title: '',
      text: '',
      options: ['', '', '', ''],
      correctOption: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Question</h2>
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
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionModal;