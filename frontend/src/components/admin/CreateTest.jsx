import React, { useState } from "react";
import axios from "axios";
import { Plus, Trash2, Save } from "lucide-react";

const CreateTest = () => {
  // --- STATE MANAGEMENT (UPDATED) ---
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    time: "",
  });

  // Each question now has separate fields for options and correctOption is "A"/"B"/"C"/"D"
  const [questions, setQuestions] = useState([
    {
      text: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      correctOption: "",
    },
  ]);

  // --- HANDLERS (UPDATED) ---
  const handleTestChange = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  // Handles changes for question text and options
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handles correct option as "A", "B", "C", or "D"
  const handleCorrectOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", optiona: "", optionb: "", optionc: "", optiond: "", correctOption: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // --- SUBMIT HANDLER (UPDATED) ---
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const testResponse = await axios.post(
        "http://localhost:8080/api/test",
        testData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const testId = testResponse.data.id;

      for (const question of questions) {
        await axios.post(
          "http://localhost:8080/api/test/question",
          {
            testId,
            questionText: question.text,
            optionA: question.optiona,
            optionB: question.optionb,
            optionC: question.optionc,
            optionD: question.optiond,
            correctOption: question.correctOption,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      alert("Test created successfully!");
      setTestData({ title: "", description: "", time: "" });
      setQuestions([{ text: "", optiona: "", optionb: "", optionc: "", optiond: "", correctOption: "" }]);
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Failed to create test");
    }
  };

  // --- UI IMPLEMENTATION (UPDATED) ---
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Test
        </h1>
        <p className="text-gray-600">Design and configure your quiz</p>
      </div>

      {/* Test Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Test Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Title *
            </label>
            <input
              type="text"
              name="title"
              value={testData.title}
              onChange={handleTestChange}
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
              name="time"
              value={testData.time}
              onChange={handleTestChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={testData.description}
              onChange={handleTestChange}
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
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Question
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">
                  Question {index + 1}
                </h4>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <textarea
                placeholder="Enter your question"
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["optiona", "optionb", "optionc", "optiond"].map((field, optIndex) => (
                  <div
                    key={field}
                    className="flex items-center gap-3 bg-white p-2 border border-gray-300 rounded-md"
                  >
                    <input
                      type="radio"
                      name={`correctOption-${index}`}
                      checked={q.correctOption === String.fromCharCode(65 + optIndex)}
                      onChange={() => handleCorrectOptionChange(index, String.fromCharCode(65 + optIndex))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <input
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                      value={q[field]}
                      onChange={(e) =>
                        handleQuestionChange(index, field, e.target.value)
                      }
                      className="w-full border-none focus:ring-0 p-0 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
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