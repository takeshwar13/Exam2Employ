import React, { useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

const CreateTest = () => {
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    time: ""
  });

  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", ""],
      correctOption: 0
    }
  ]);

  const handleTestChange = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "text") {
      updatedQuestions[index].text = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = parseInt(value);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctOption: 0 }
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const testResponse = await axios.post(
        "http://localhost:8080/api/test",
        testData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const testId = testResponse.data.id;

      for (const question of questions) {
        await axios.post(
          "http://localhost:8080/api/test/question",
          {
            testId,
            text: question.text,
            options: question.options,
            correctOption: question.correctOption
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      alert("Test created successfully!");
      setTestData({ title: "", description: "", time: "" });
      setQuestions([{ text: "", options: ["", "", "", ""], correctOption: 0 }]);
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Failed to create test");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Test</h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Test Title"
          value={testData.title}
          onChange={handleTestChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Test Description"
          value={testData.description}
          onChange={handleTestChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="time"
          placeholder="Time Limit (minutes)"
          value={testData.time}
          onChange={handleTestChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <h3 className="text-xl font-medium mb-2">Questions</h3>
      {questions.map((q, index) => (
        <div key={index} className="border p-4 mb-4 rounded bg-gray-50">
          <div className="mb-2 flex justify-between items-center">
            <h4 className="font-medium">Question {index + 1}</h4>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Question Text"
            value={q.text}
            onChange={(e) =>
              handleQuestionChange(index, "text", e.target.value)
            }
            className="w-full mb-2 p-2 border rounded"
          />
          {q.options.map((option, optIndex) => (
            <div key={optIndex} className="mb-1 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleQuestionChange(index, optIndex, e.target.value)
                }
                className="flex-grow p-2 border rounded"
              />
              <input
                type="radio"
                name={`correctOption-${index}`}
                checked={q.correctOption === optIndex}
                onChange={() => handleCorrectOptionChange(index, optIndex)}
              />
              <label>Correct</label>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <Plus size={18} /> Add Question
      </button>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Test
        </button>
      </div>
    </div>
  );
};

export default CreateTest;
