import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const enterFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };
    enterFullScreen();
  }, []);

/*  useEffect(() => {
    const handleBlur = () => alert('Tab switching is not allowed!');
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);
*/
  const fetchTest = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const testDTO = res.data.testDTO;
      const fetchedQuestions = res.data.questions;

      // Validate structure
      if (!testDTO || !fetchedQuestions || fetchedQuestions.length === 0) {
        throw new Error("Invalid test structure");
      }

      setTest(testDTO);
      setQuestions(fetchedQuestions);
      setTimeLeft(testDTO.time || 600); // default to 10 minutes if missing
      setLoading(false);
    } catch (err) {
      console.error('Error fetching test:', err);
      setError('Failed to load test.');
      setLoading(false);
    }
  }, [testId, token]);

  useEffect(() => {
    fetchTest();
  }, [fetchTest]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = useCallback(async () => {
    alert('Submitting your test...');
    console.log(answers);
    console.log(testId);
    console.log(token);
    try {
      await axios.post(
        `http://localhost:8080/api/test/submit-test`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Test submitted successfully!');
      window.location.href = "/user-dashboard";
    } catch (err) {
      console.log(err);
      console.error('Error submitting test:', err);
//      alert('Failed to submit test.');
    }
  }, [answers, testId, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <p>Loading test...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="test-container" style={styles.container}>
      <h2 style={styles.heading}>{test?.title}</h2>
      <p>{test?.description}</p>
      <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>

      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={question.id} style={styles.questionBox}>
            <p style={styles.questionText}>{index + 1}. {question.questionText}</p>
            <ul style={styles.optionsList}>
              {question.options.map((opt, idx) => (
                <li key={idx} style={styles.optionItem}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={idx}
                      checked={answers[question.id] === idx}
                      onChange={() => handleOptionSelect(question.id, idx)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No questions available.</p>
      )}

      <button onClick={handleSubmit} style={styles.submitButton}>Submit Test</button>
    </div>
  );
};

export default TestPage;

// CSS-in-JS Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '10px'
  },
  questionBox: {
    marginBottom: '25px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  optionsList: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  optionItem: {
    marginBottom: '8px'
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};
