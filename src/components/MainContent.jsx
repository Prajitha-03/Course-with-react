import React from 'react';

const MainContent = ({
    selectedChapterName,
    selectedVideo,
    selectedDescription,
    selectedQuiz,
    showDescription,
    showQuiz,
    setShowDescription,
    setShowQuiz,
    selectedAnswers,
    quizResults,
    handleAnswerSelect,
}) => {
    return (
        <div className="flex-1 p-6 bg-white">
            {selectedChapterName && (
                <h3 className="text-2xl font-semibold mb-4">{selectedChapterName}</h3>
            )}
            {selectedVideo ? (
                <iframe
                    className="w-190 h-120 p-0 10 rounded-md shadow-lg"
                    src={selectedVideo}
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p className="text-gray-500 flex items-center justify-center h-screen">
                    Select a chapter to watch the video
                </p>
            )}
            {selectedVideo && (
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={() => {
                            setShowDescription(true);
                            setShowQuiz(false);
                        }}
                        className={`px-4 py-2 rounded-md shadow-md ${showDescription
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => {
                            setShowDescription(false);
                            setShowQuiz(true);
                        }}
                        className={`px-4 py-2 rounded-md shadow-md ${showQuiz
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        Quiz
                    </button>
                </div>
            )}
            {showDescription && selectedDescription && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p className="text-gray-600">{selectedDescription}</p>
                </div>
            )}
            {showQuiz && selectedQuiz.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium mb-2">Quiz</h4>
                    <ul>
                        {selectedQuiz.map((quizItem, questionIndex) => (
                            <li key={questionIndex} className="mb-4">
                                <p className="font-medium">{quizItem.question}</p>
                                <ul className="ml-4">
                                    {quizItem.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>
                                            <label
                                                className={`block p-2 rounded-md cursor-pointer ${selectedAnswers[questionIndex] === option
                                                    ? quizResults[questionIndex]
                                                        ? 'bg-green-200'
                                                        : 'bg-red-200'
                                                    : ''
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${questionIndex}`}
                                                    value={option}
                                                    className="mr-2"
                                                    onChange={() =>
                                                        handleAnswerSelect(questionIndex, option)
                                                    }
                                                    checked={
                                                        selectedAnswers[questionIndex] === option
                                                    }
                                                />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MainContent;