import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, Maximize, Minimize } from 'lucide-react';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const testDuration = 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Use a ref to store the start time of the test
  const startTimeRef = useRef(Date.now());

  // Mock test questions data
  const mockQuestions = [
    {
      id: 1,
      text: "What does HTML stand for?",
      options: [
        "Hypertext Markup Language",
        "Hyperlink Markup Language",
        "Home Tool Markup Language",
        "Hyper Text Multiple Language"
      ]
    },
    {
      id: 2,
      text: "Which of the following is a JavaScript framework?",
      options: [
        "Django",
        "React",
        "Flask",
        "Rails"
      ]
    },
    {
      id: 3,
      text: "Which is used to style web pages?",
      options: [
        "HTML",
        "CSS",
        "JavaScript",
        "SQL"
      ]
    }
  ];

  // Helper functions for Fullscreen API
  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // The function to submit the test.
  const handleSubmitTest = async () => {
    // Only submit if not already submitting
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Test submitted with answers:', answers);
      exitFullScreen(); // Exit full-screen on submission
      navigate('/results');
    } catch (err) {
      setError('Failed to submit test');
      console.error('Error submitting test:', err);
      setIsLoading(false);
    }
  };

  // Fetch test questions and initialize start time
  useEffect(() => {
    const fetchTestQuestions = async () => {
      try {
        setIsLoading(true);
        // Using mock data instead of API call
        setQuestions(mockQuestions);
        const initialAnswers = {};
        mockQuestions.forEach((q) => {
          initialAnswers[q.id] = null;
        });
        setAnswers(initialAnswers);

        // Initialize the start time when the test data is loaded
        startTimeRef.current = Date.now();

      } catch (err) {
        setError('Failed to load test questions');
        console.error('Error fetching test:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestQuestions();
  }, [testId]);

  // Timer countdown and auto-submit with corrected logic
  useEffect(() => {
    // We only set the timer if the questions have loaded
    if (!questions.length) return;

    const timerInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remainingTime = testDuration - elapsedTime;

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
        clearInterval(timerInterval);
        handleSubmitTest();
      }
    }, 1000);

    // Cleanup function
    return () => clearInterval(timerInterval);
  }, [questions.length, testId, handleSubmitTest]);

  // Tab Change Warning and Full-Screen state management
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Warning: Switching tabs during the test is not allowed. Your test may be automatically submitted.");
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading test...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Tests
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-800">Quiz App</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-red-600">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">Time remaining: {formatTime(timeLeft)}</span>
          </div>
          <button onClick={toggleFullScreen} className="text-gray-600 hover:text-gray-800">
            {isFullScreen ? (
              <Minimize className="h-6 w-6" />
            ) : (
              <Maximize className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-8 mt-20">
        {questions.map((question, qIndex) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {qIndex + 1}. {question.text}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`flex items-center p-3 border rounded-md cursor-pointer ${
                    answers[question.id] === oIndex
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(question.id, oIndex)}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === oIndex}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3">{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmitTest}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-75"
        >
          {isLoading ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

export default TestPage;