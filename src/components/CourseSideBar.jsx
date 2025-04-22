import React, { useState } from 'react';
import PdfModal from './PdfModal';
import data from '../data/data.json';
import QuizModal from "./QuizModal";

const CourseSidebar = ({

    courses,
    expandedCourses,
    toggleChapters,
    handleChapterClick,
}) => {

    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isQuizOpen, setIsQuizOpen] = useState(false); 
    const [quizUnit, setQuizUnit] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    // Function to handle opening of QuizModal
    const openQuizModal = (unit) => {
        setQuizUnit(unit);
        setIsQuizOpen(true);
    };

    const closeQuizModal = () => {
        setIsQuizOpen(false);
    };

    return (
        <div className="w-110 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto shadow-md">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>

            <ul>
                {courses.map((course, courseIndex) => (
                    course.units.map((unit, unitIndex) => (
                        <li key={`${courseIndex}-${unitIndex}`}>
                            <div
                                className="cursor-pointer p-2 bg-gray-200 border border-gray-300 mb-2 hover:bg-gray-300 transition rounded"
                                onClick={() => toggleChapters({ courseIndex, unitIndex })}
                            >
                                {unit.title}
                            </div>

                            {expandedCourses &&
                                expandedCourses.courseIndex === courseIndex &&
                                expandedCourses.unitIndex === unitIndex && (
                                    <ul className="ml-4">
                                        {unit.lessons && unit.lessons.map((lesson, lessonIndex) => (
                                            <li
                                                key={lessonIndex}
                                                className="flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition"
                                            >
                                                <div
                                                    className="flex items-center"
                                                    onClick={() => handleChapterClick(lesson, courseIndex, unitIndex, lessonIndex)}
                                                >
                                                    <iframe
                                                        className="w-24 h-16 mr-4 rounded-md shadow-md"
                                                        src={lesson.videoUrl}
                                                        title={`Thumbnail for ${lesson.title}`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe> 
                                                    <span>{lesson.title}</span>
                                                </div>

                                                {lesson.fileUrl && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPdf(lesson);
                                                            setShowPdfModal(true);
                                                        }}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        View PDF
                                                    </button>
                                                )}
                                            </li>
                                        ))}

                                        {unit.quizId && (
                                            <li className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition">
                                                <span
                                                    onClick={() => openQuizModal(unit)}
                                                    className="text-purple-600 hover:text-purple-800"
                                                >
                                                    Quiz
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                )
                            }
                        </li>
                    ))
                ))}
            </ul>

            {showPdfModal && selectedPdf && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-gray-100 rounded-lg shadow-lg p-2 w-11/12 max-h-screen overflow-y-auto">
                        <button
                            onClick={() => setShowPdfModal(false)}
                            className="text-red-500 float-right text-lg font-bold"
                        >
                            ✖
                        </button>
                        <PdfModal lesson={selectedPdf} /> {/* Pass lesson, not course */}
                    </div>
                </div>
            )}


            {/* Quiz Modal */}
            {isQuizOpen && quizUnit && (
                <QuizModal closeQuizModal={closeQuizModal} unit={quizUnit} />
            )}
        </div>
    );
};

export default CourseSidebar;
