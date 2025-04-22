import React from 'react';
import AllCoursesSection from './AllCoursesSection';

const MainContent = ({
    selectedChapterName,
    selectedVideo,
    selectedDescription,
<<<<<<< HEAD
    showDescription,
    setShowDescription,
=======
    selectedQuiz,
    showDescription,
    showQuiz,
    setShowDescription,
    setShowQuiz,
    selectedAnswers,
    quizResults,
    handleAnswerSelect,
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
    onNextChapter,
    courses,
    currentCourseIndex,
    handleChapterClick,
    currentChapterIndex,
    onPrevChapter,
    showAllCourses,
    setShowAllCourses,
}) => {

    return (
        <div className="flex-1 p-4 bg-white max-h-screen overflow-y-auto cursor-pointer">
            <div className="mt-4 flex justify-between">
                {selectedChapterName && (
                    <button
                        onClick={onPrevChapter}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-300 text-white"
                    >
                        <span className='text-xl text-gray-700'>&lt;</span>
                    </button>
                )}
                {selectedVideo ? (
                    <div className="w-full max-w-5xl mx-auto aspect-video">
                        <iframe
                            className="w-full h-full rounded-xl shadow-lg"
                            src={selectedVideo}
                            title="Video Player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a chapter to watch the video</p>
                    </div>
                )}
                {selectedChapterName && (
                    <button
                        onClick={onNextChapter}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-300 text-white"
                    >
                        <span className='text-xl text-gray-700'>&gt;</span>
                    </button>
                )}
            </div>
            {selectedVideo && (
                <div className="mt-4 flex space-x-4 cursor-">
                    <button
                        onClick={() => {
                            setShowDescription(true);
<<<<<<< HEAD
=======
                            setShowQuiz(false);
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
                            setShowAllCourses(false); // Hide AllCoursesSection
                        }}
                        className={`px-4 py-2 rounded-md shadow-md ${showDescription
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => {
                            setShowDescription(false);
<<<<<<< HEAD
=======
                            setShowQuiz(true);
                            setShowAllCourses(false); // Hide AllCoursesSection
                        }}
                        className={`px-4 py-2 rounded-md shadow-md ${showQuiz
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        Quiz
                    </button>
                    <button
                        onClick={() => {
                            setShowDescription(false);
                            setShowQuiz(false);
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
                            setShowAllCourses(true); // Show AllCoursesSection
                        }}
                        className={`px-4 py-2 rounded-md shadow-md ${showAllCourses
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                    >
                        All Courses
                    </button>
                </div>
            )}
            {showDescription && selectedDescription && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p className="text-gray-600">{selectedDescription}</p>
                </div>
            )}
<<<<<<< HEAD
=======
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
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
            {showAllCourses && (
                <div className="mt-4">
                    <AllCoursesSection
                        courses={courses}
                        handleChapterClick={handleChapterClick}
                    />
                </div>
            )}
        </div>
    );
};

export default MainContent;