import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizModal = ({ closeQuizModal }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('/data/questions.json')
      .then(res => {
        setQuestions(res.data);
        const initial = res.data.map(q => q.questionType === 'Multiple Answers' ? [] : '');
        setAnswers(initial);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load questions:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSelect = (value) => {
    const updated = [...answers];
    const q = questions[current];

    if (q.questionType === 'Multiple Answers') {
      const currentSet = new Set(updated[current]);
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      updated[current] = Array.from(currentSet);
    } else {
      updated[current] = value;
    }

    setAnswers(updated);
  };

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      const q = questions[idx];

      if (q.questionType === 'Multiple Answers') {
        const correctAns = q.correctAnswer.map(a => a.toLowerCase()).sort();
        const userAns = (ans || []).map(a => a.toLowerCase()).sort();
        if (JSON.stringify(correctAns) === JSON.stringify(userAns)) {
          correct += 1;
        }
      } else {
        if ((ans || '').trim().toLowerCase() === q.correctAnswer.toLowerCase()) {
          correct += 1;
        }
      }
    });
    setScore(correct);
  };

  const renderQuestion = () => {
    const q = questions[current];
    const ans = answers[current];
    const isCorrect = q.questionType === 'Multiple Answers'
      ? JSON.stringify((ans || []).map(a => a.toLowerCase()).sort()) ===
        JSON.stringify((q.correctAnswer || []).map(a => a.toLowerCase()).sort())
      : (ans || '').trim().toLowerCase() === q.correctAnswer.toLowerCase();

    if (reviewMode) {
      return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="mb-2">
            <strong>Your Answer:</strong>{' '}
            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {Array.isArray(ans) ? ans.join(', ') : ans || 'No Answer'}
            </span>
          </p>
          {!isCorrect && (
            <p>
              <strong>Correct Answer:</strong>{' '}
              <span className="text-green-600">
                {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
              </span>
            </p>
          )}
        </div>
      );
    }

    switch (q.questionType) {
      case 'MCQ':
        return (
          <div className="space-y-3 mt-4">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  const updated = [...answers];
                  updated[current] = opt;
                  setAnswers(updated);
                }}
                className={`w-full text-left border p-3 rounded-lg shadow-sm transition ${
                  answers[current] === opt
                    ? 'bg-blue-500 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-blue-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case 'True/False':
        return (
          <div className="flex justify-between mt-4 gap-4">
            {['true', 'false'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`flex-1 border p-3 rounded-lg shadow-sm transition ${
                  answers[current] === opt
                    ? 'bg-green-500 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-green-50'
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        );

      case 'Fill in the Blanks':
        return (
          <input
            type="text"
            value={answers[current]}
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full mt-4 border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Type your answer here..."
          />
        );

      case 'Multiple Answers':
        return (
          <div className="space-y-3 mt-4">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left border p-3 rounded-lg shadow-sm transition ${
                  answers[current]?.includes(opt)
                    ? 'bg-purple-500 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading || error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center text-red-500">
          {loading ? 'Loading Quiz...' : 'Failed to load quiz 😢'}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full">
        <button
          onClick={closeQuizModal}
          className="text-red-500 float-right text-lg font-bold mb-4"
        >
          ✖
        </button>
        {score !== null ? (
          reviewMode ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-600">Review</h2>
                <p className="text-gray-700 mt-2">{questions[current].questionText}</p>
                <div className="text-sm text-gray-400 mt-1">({questions[current].questionType})</div>
              </div>
              {renderQuestion()}
              <div className="flex justify-between mt-8">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((prev) => prev - 1)}
                  className={`py-2 px-4 rounded-lg transition ${
                    current === 0
                      ? 'bg-gray-300 text-white cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                <button
                  disabled={current === questions.length - 1}
                  onClick={() => setCurrent((prev) => prev + 1)}
                  className={`py-2 px-4 rounded-lg transition ${
                    current === questions.length - 1
                      ? 'bg-gray-300 text-white cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="mt-4 text-center text-gray-500 text-sm">
                {current + 1} / {questions.length}
              </div>
              <button
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
                onClick={() => {
                  setScore(null);
                  setAnswers(questions.map(q => q.questionType === 'Multiple Answers' ? [] : ''));
                  setCurrent(0);
                  setReviewMode(false);
                }}
              >
                Retake Quiz
              </button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-blue-600">🎉 Quiz Completed!</h2>
              <p className="text-xl">Your Score:</p>
              <p className="text-2xl font-bold">{score} / {questions.length}</p>
              <button
                onClick={() => {
                  setReviewMode(true);
                  setCurrent(0);
                }}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full transition"
              >
                Review Answers
              </button>
              <button
                onClick={() => {
                  setScore(null);
                  setAnswers(questions.map(q => q.questionType === 'Multiple Answers' ? [] : ''));
                  setCurrent(0);
                }}
                className="block w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition"
              >
                Restart Quiz
              </button>
            </div>
          )
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Question {current + 1}</h2>
              <p className="mt-2 text-gray-600">{questions[current].questionText}</p>
              <div className="text-sm text-gray-400 mt-1">
                ({questions[current].questionType})
              </div>
            </div>
            {renderQuestion()}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrent(prev => prev - 1)}
                disabled={current === 0}
                className={`py-2 px-4 rounded-lg transition ${
                  current === 0
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              {current + 1 === questions.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={!answers[current] || answers[current].length === 0}
                  className={`py-2 px-4 rounded-lg transition ${
                    !answers[current] || answers[current].length === 0
                      ? 'bg-green-300 text-white cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrent(prev => prev + 1)}
                  disabled={!answers[current] || answers[current].length === 0}
                  className={`py-2 px-4 rounded-lg transition ${
                    !answers[current] || answers[current].length === 0
                      ? 'bg-blue-300 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              )}
            </div>
            <div className="mt-4 text-center text-gray-500 text-sm">
              {current + 1} / {questions.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
