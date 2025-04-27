import React, { useState } from 'react';
import PdfModal from './PdfModal';
import QuizModal from './QuizModal';

const CourseSidebar = ({ courses, expandedCourses, toggleChapters, handleChapterClick }) => {
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [quizUnit, setQuizUnit] = useState(null);

    const openQuizModal = (unit) => {
        setQuizUnit(unit);
        setIsQuizOpen(true);
    };

    const closeQuizModal = () => {
        setIsQuizOpen(false);
    };

    return (
        <div className="relative">
            <div className={showPdfModal ? "filter blur-md pointer-events-none" : ""}>
                <div className="w-110 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto shadow-md">
                    <h2 className="text-xl font-bold mb-4">Course Content</h2>
                    <ul>
                        {courses.map((course) => (
                            course.units.map((unit) => (
                                <li key={unit._id.$oid}>
                                    <div
                                        className="cursor-pointer p-2 bg-gray-200 border border-gray-300 mb-2 hover:bg-gray-300 transition rounded"
                                        onClick={() => toggleChapters({ courseId: course._id.$oid, unitId: unit._id.$oid })}
                                    >
                                        {unit.title}
                                    </div>

                                    {expandedCourses?.courseId === course._id.$oid &&
                                        expandedCourses?.unitId === unit._id.$oid && (
                                            <ul className="ml-4">
                                                {unit.lessons && unit.lessons.map((lesson) => (
                                                    <li
                                                        key={lesson._id.$oid}
                                                        className="flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            onClick={() => handleChapterClick(lesson, course._id.$oid, unit._id.$oid)}
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
                                                                className="text-blue-500 hover:underline text-sm ml-2"
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
                                        )}
                                </li>
                            ))
                        ))}
                    </ul>
                </div>
            </div>

            {/* PDF Modal */}
            {showPdfModal && selectedPdf && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-11/12 max-h-screen overflow-y-auto relative">
                        <button
                            onClick={() => setShowPdfModal(false)}
                            className="absolute top-2 right-4 text-red-500 text-2xl font-bold"
                        >
                            ✖
                        </button>
                        <PdfModal lesson={selectedPdf} />
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
