import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const mathConfig = {
  loader: { load: ['input/asciimath', 'output/chtml'] },
  options: { renderActions: { addMenu: [] } },
};

const QuizModal = ({ closeQuizModal, unit }) => {
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
        setAnswers(res.data.map(q => q.questionType === 'Multiple Answers' ? [] : ''));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSelect = (value) => {
    const updated = [...answers];
    const q = questions[current];
    if (q.questionType === 'Multiple Answers') {
      const selected = new Set(updated[current]);
      selected.has(value) ? selected.delete(value) : selected.add(value);
      updated[current] = Array.from(selected);
    } else {
      updated[current] = value;
    }
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const total = questions.reduce((acc, q, idx) => {
      const userAns = answers[idx];
      if (q.questionType === 'Multiple Answers') {
        const correct = q.correctAnswer.map(a => a.toLowerCase()).sort().join(',');
        const user = (userAns || []).map(a => a.toLowerCase()).sort().join(',');
        return acc + (correct === user ? 1 : 0);
      } else {
        return acc + ((userAns || '').trim().toLowerCase() === q.correctAnswer.toLowerCase() ? 1 : 0);
      }
    }, 0);
    setScore(total);
  };

  const renderQuestion = () => {
    const q = questions[current];
    const ans = answers[current];
    const isCorrect = q.questionType === 'Multiple Answers'
      ? (ans || []).map(a => a.toLowerCase()).sort().join(',') ===
        (q.correctAnswer || []).map(a => a.toLowerCase()).sort().join(',')
      : (ans || '').trim().toLowerCase() === q.correctAnswer.toLowerCase();
      if (reviewMode) {
        return (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p className="mb-2">
              <strong>Your Answer:</strong>{' '}
              <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                <MathJax>{Array.isArray(ans) ? ans.join(', ') : ans || 'No Answer'}</MathJax>
              </span>
            </p>
            {!isCorrect && (
              <p>
                <strong>Correct Answer:</strong>{' '}
                <span className="text-green-600">
                  <MathJax>{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}</MathJax>
                </span>
              </p>
            )}
          </div>
        );
      }
  
    const commonProps = 'w-full text-left border p-3 rounded-lg shadow-sm transition';

    switch (q.questionType) {
      case 'MCQ':
        return (
          <div className="space-y-3 mt-4">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`${commonProps} ${ans === opt ? 'bg-blue-500 text-white scale-105' : 'bg-white hover:bg-blue-50'}`}
              >
                <MathJax>{opt}</MathJax>
              </button>
            ))}
          </div>
        );

      case 'True/False':
        return (
          <div className="flex justify-between mt-4 gap-4">
            {['true', 'false'].map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`${commonProps} flex-1 ${ans === opt ? 'bg-green-500 text-white scale-105' : 'bg-white hover:bg-green-50'}`}
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
            value={ans}
            onChange={(e) => handleSelect(e.target.value)}
            className="w-full mt-4 border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Type your answer here..."
          />
        );

      case 'Multiple Answers':
        return (
          <div className="space-y-3 mt-4">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`${commonProps} ${ans?.includes(opt) ? 'bg-purple-500 text-white scale-105' : 'bg-white hover:bg-purple-50'}`}
              >
                <MathJax>{opt}</MathJax>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading || error) {
    return <div className="text-center py-8">{loading ? 'Loading Quiz...' : 'Failed to load quiz 😢'}</div>;
  }

  return (
    <MathJaxContext config={mathConfig}>
      <div className="bg-white shadow-md p-4 mt-3 w-full">

        {score !== null ? (
            reviewMode ? (
              <>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Review</h2>
                <MathJax>{questions[current].questionText}</MathJax>
                <div className="text-sm text-gray-400 mt-1 mb-4">({questions[current].questionType})</div>
                {renderQuestion()}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrent(current - 1)}
                    disabled={current === 0}
                    className={`py-2 px-4 rounded-lg ${current === 0 ? 'bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrent(current + 1)}
                    disabled={current === questions.length - 1}
                    className={`py-2 px-4 rounded-lg ${current === questions.length - 1 ? 'bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                  >
                    Next
                  </button>
                </div>
              </>
            )  : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600">🎉 Quiz Completed!</h2>
                <p className="text-xl mt-2">Your Score: {score} / {questions.length}</p>
                <button
                  onClick={() => { setReviewMode(true); setCurrent(0); }}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
                >
                  Review Answers
                </button>
              </div>
            )
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">Question {current + 1}</h2>
              <MathJax>{questions[current].questionText}</MathJax>
              <div className="text-sm text-gray-400 mt-1">({questions[current].questionType})</div>
              {renderQuestion()}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrent(prev => prev - 1)}
                  disabled={current === 0}
                  className={`py-2 px-4 rounded-lg ${current === 0 ? 'bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                  Previous
                </button>
                <button
                  onClick={current + 1 === questions.length ? handleSubmit : () => setCurrent(prev => prev + 1)}
                  disabled={!answers[current]?.length}
                  className={`py-2 px-4 rounded-lg ${!answers[current]?.length ? 'bg-blue-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {current + 1 === questions.length ? 'Submit' : 'Next'}
                </button>
              </div>
              <div className="text-center text-gray-500 text-sm mt-2">
                {current + 1} / {questions.length}
              </div>
            </>
          )}
          </div>
    </MathJaxContext>
    
  );
};

export default QuizModal;
