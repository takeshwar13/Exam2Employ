import React, { useEffect, useState, useContext, useCallback } from 'react';
import { NavbarVisibilityContext } from './UserLayout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setShowNavbar } = useContext(NavbarVisibilityContext);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/test/${testId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('API Response:', response.data);

        if (!response.data || !response.data.testDTO || !response.data.questions) {
          throw new Error("Invalid test data structure");
        }

        const processedQuestions = response.data.questions.map(question => ({
          ...question,
          options: [
            question.optionA,
            question.optionB,
            question.optionC,
            question.optionD
          ].filter(option => option !== null && option !== '')
        }));

        setTest(response.data.testDTO);
        setQuestions(processedQuestions);
        setTimeLeft((response.data.testDTO.time || 10) * 60);
      } catch (err) {
        console.error('Error fetching test:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load test.');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId, token, navigate]);

  const startTest = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    setShowNavbar(false);
    setStarted(true);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };



  const handleSubmit = useCallback(async () => {
    if (!window.confirm('Are you sure you want to submit your test?')) return;
    setSubmitting(true);
    try {
      // Validate all required IDs
      if (!testId || testId === 'undefined' || testId === 'null') {
        throw new Error("Test ID is missing or invalid");
      }
      if (!userId || userId === 'undefined' || userId === 'null') {
        throw new Error("User ID is missing. Please log in again.");
      }
      // Prepare responses
      const responses = Object.entries(answers)
        .filter(([_, optionIndex]) => optionIndex !== undefined)
        .map(([questionId, optionIndex]) => {
          const qId = parseInt(questionId);
          if (!qId || isNaN(qId)) {
            throw new Error(`Invalid question ID: ${questionId}`);
          }
          return {
            questionId: qId,
            selectedOption: ['A', 'B', 'C', 'D'][optionIndex]
          };
        });
      if (responses.length === 0) {
        throw new Error("No answers provided. Please answer at least one question.");
      }
      // Calculate time spent in seconds
      let totalTestSeconds = (test?.time || 10) * 60;
      let timeSpentSeconds = totalTestSeconds - timeLeft;
      if (timeSpentSeconds < 0) timeSpentSeconds = 0;
      const payload = {
        testId: parseInt(testId),
        userId: parseInt(userId),
        responses: responses,
        timeSpentSeconds: timeSpentSeconds
      };
      await axios.post(
        'http://localhost:8080/api/test/submit-test',
        payload,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Test submitted successfully!');
      setShowNavbar(true);
      navigate('/user-dashboard');
    } catch (err) {
      console.error('Submission error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        fullError: err
      });
      let errorMessage = 'Failed to submit test. Please try again.';
      if (err.response?.data) {
        errorMessage = typeof err.response.data === 'string' 
          ? err.response.data 
          : err.response.data.message || errorMessage;
      }
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [answers, test, testId, timeLeft, token, userId, setShowNavbar, navigate]);

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="text-center py-8">Loading test...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{test?.title}</h2>
        <p className="mb-4">{test?.description}</p>
        <div className="mb-6">
          <p><span className="font-semibold">Duration:</span> {test?.time} minutes</p>
          <p><span className="font-semibold">Questions:</span> {questions.length}</p>
        </div>
        <button 
          onClick={startTest}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Start Test
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{test?.title}</h2>
        <div className="bg-gray-100 px-3 py-1 rounded">
          <span className="font-medium">Time Left: </span>
          <span className="text-red-600">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={question.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">{qIndex + 1}. {question.questionText}</h3>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <label 
                  key={optIndex} 
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === optIndex}
                    onChange={() => handleOptionSelect(question.id, optIndex)}
                    className="h-4 w-4"
                  />
                  <span>{['A', 'B', 'C', 'D'][optIndex]}. {option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-8 py-2 rounded text-white ${submitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

export default TestPage;