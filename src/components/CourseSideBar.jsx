import React, { useState } from 'react';

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
        </div>
    );
};

export default CourseSidebar;

