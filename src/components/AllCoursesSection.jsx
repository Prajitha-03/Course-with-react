import React from 'react';

const AllCoursesSection = ({ courses, handleChapterClick }) => {
    return (
        <div className="all-courses-section mt-4">
            <h3 className="text-lg font-medium mb-2">Continue Learning</h3>
            <div className="topic-list flex flex-wrap gap-2 bg-gray-00">
                {courses.map((course, courseIndex) => {
                    const firstChapter = course.chapters[0];
                    return (
                        <div
                            className="topic-box w-35 h-25 m-2 rounded-md shadow-md overflow-hidden cursor-pointer bg-grey-200"
                            onClick={() => handleChapterClick(firstChapter, courseIndex, 0)}
                            key={courseIndex}
                        >
                            <img
                                src={`https://via.placeholder.com/150?text=${course.name}`}
                                alt={course.name}
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