import React from 'react';

const AllCoursesSection = ({ courses, handleChapterClick }) => {
    return (
        <div className="all-courses-section mt-4">
            <h3 className="text-lg font-medium mb-2">Continue Learning</h3>
            <div className="topic-list flex flex-wrap gap-2 bg-gray-100 p-2 rounded-md">
                {courses.map((course, courseIndex) => {
                    const firstUnit = course.units?.[0]; 
                    if (!firstUnit) return null;
                    const firstLesson = firstUnit.lessons?.[0];
                    if (!firstLesson) return null;

                    return (
                        <div
                            className="topic-box w-40 h-32 m-2 rounded-md shadow-md overflow-hidden cursor-pointer bg-gray-200 hover:bg-gray-300 transition"
                            onClick={() => handleChapterClick(firstLesson, courseIndex, 0)}
                            key={courseIndex}
                        >
                            <img
                                src={`https://via.placeholder.com/150?text=${encodeURIComponent(course.title)}`}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllCoursesSection;
