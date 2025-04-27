import React, { useState, useEffect } from 'react';

const QuizModal = ({ closeQuizModal }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        return res.json();
      })
      .then(data => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(''));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading questions:', err);
        setError(true);
        setLoading(false);
      });
  }, [unit.ID]);

  const handleSelect = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((ans, index) => {
      if (ans.trim().toLowerCase() === questions[index].correctAnswer.toLowerCase()) {
        correct += 1;
      }
    });
    setScore(correct);
  };

  const renderQuestion = () => {
    const q = questions[current];
    const userAnswer = answers[current];
    const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.toLowerCase();

    if (reviewMode) {
      return (
        <div className="mt-4 p-4 rounded-lg border shadow-sm bg-gray-50">
          <p className="mb-2">
            <span className="font-semibold">Your Answer:</span>{" "}
            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {userAnswer || 'No Answer'}
            </span>
          </p>
          {!isCorrect && (
            <p>
              <span className="font-semibold">Correct Answer:</span>{" "}
              <span className="text-green-600">{q.correctAnswer}</span>
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
                onClick={() => handleSelect(opt)}
                className={`w-full text-left border p-3 rounded-lg shadow-sm transition ${answers[current] === opt
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
                className={`flex-1 border p-3 rounded-lg shadow-sm transition ${answers[current] === opt
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
            className="w-full mt-4 border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={answers[current]}
            onChange={(e) => handleSelect(e.target.value)}
            placeholder="Type your answer here..."
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">Loading Quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center text-red-500">
          Failed to load quiz 😢
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full animate-fadeIn">
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
                <div className="text-sm text-gray-400 mt-1">
                  ({questions[current].questionType})
                </div>
              </div>

              {renderQuestion()}

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => setCurrent((prev) => prev - 1)}
                  disabled={current === 0}
                  className={`py-2 px-4 rounded-lg transition ${current === 0
                      ? 'bg-gray-300 text-white cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrent((prev) => prev + 1)}
                  disabled={current === questions.length - 1}
                  className={`py-2 px-4 rounded-lg transition ${current === questions.length - 1
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
                  setAnswers(Array(questions.length).fill(''));
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
                  setAnswers(Array(questions.length).fill(''));
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

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrent((prev) => prev - 1)}
                disabled={current === 0}
                className={`py-2 px-4 rounded-lg transition ${current === 0
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
              >
                Previous
              </button>

              {current + 1 === questions.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={answers[current] === ''}
                  className={`py-2 px-4 rounded-lg transition ${answers[current] === ''
                      ? 'bg-green-300 text-white cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrent((prev) => prev + 1)}
                  disabled={answers[current] === ''}
                  className={`py-2 px-4 rounded-lg transition ${answers[current] === ''
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
