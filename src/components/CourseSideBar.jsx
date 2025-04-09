import React from 'react';
const CourseSidebar = ({ courses, expandedCourses, toggleChapters, handleChapterClick }) => {
    return (
        <div className="w-110 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto shadow-md">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        <div
                            className="cursor-pointer p-2 bg-gray-200 border border-gray-300  mb-2 hover:bg-gray-200 transition"
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
                                        <span>{chapter.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseSidebar;