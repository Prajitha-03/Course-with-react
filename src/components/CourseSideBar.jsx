import React, { useState } from 'react';
<<<<<<< HEAD
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
=======

const CourseSidebar = ({ courses, expandedCourses, toggleChapters, handleChapterClick }) => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    return (
        <div className="relative">
            <div className={selectedPdf ? "filter blur-md pointer-events-none" : ""}>
                <div className="w-110 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto shadow-md">
                    <h2 className="text-xl font-bold mb-4">Course Content</h2>
                    <ul>
                        {courses.map((course, index) => (
                            <li key={index}>
                                <div
                                    className="cursor-pointer p-2 bg-gray-200 border border-gray-300 mb-2 hover:bg-gray-200 transition"
                                    onClick={() => toggleChapters(index)}
                                >
                                    {course.name}
                                </div>
                                {expandedCourses === index && course.chapters && (
                                    <ul className="ml-4">
                                        {course.chapters.map((chapter, chapterIndex) => (
                                            <li
                                                key={chapterIndex}
                                                className="flex items-center mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition"
                                                onClick={() => handleChapterClick(chapter, index, chapterIndex)}
                                            >
                                                <iframe
                                                    className="w-24 h-16 mr-4 rounded-md shadow-md"
                                                    src={chapter.videoUrl}
                                                    title={`Thumbnail for ${chapter.name}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                                <span className="flex items-center">
                                                    {chapter.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedPdf(`/pdfs/${chapter.pdfUrl}`)}
                                                        className="ml-2 text-blue-500 underline text-sm"
                                                    >
                                                        Attachment
                                                    </button>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {selectedPdf && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-black p-1 rounded shadow-lg w-[85%] h-[100%] relative">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full"
                            title="PDF Viewer"
                        ></iframe>
                        <button
                            className="absolute top-0 right-2 text-black-500 text-3xl font-bold"
                            onClick={() => setSelectedPdf(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
        </div>
    );
};

export default CourseSidebar;
<<<<<<< HEAD
=======

>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
