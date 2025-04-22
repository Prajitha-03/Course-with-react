import React, { useState } from 'react';
import CourseSidebar from './CourseSideBar';
import MainContent from './MainContent';
import './SideBar.css';

const SideBar = ({ courses }) => {
    const [expandedCourses, setExpandedCourses] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedChapterName, setSelectedChapterName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [showDescription, setShowDescription] = useState(true);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [showAllCourses, setShowAllCourses] = useState(false); 

    const toggleChapters = (index) => {
        setExpandedCourses(expandedCourses === index ? null : index);
    };
    

    const handleChapterClick = (chapter, courseIndex, unitIndex, lessonIndex) => {
        setSelectedVideo(chapter.videoUrl);
        setSelectedChapterName(chapter.title);
        setSelectedDescription(chapter.description || 'No description available.');
        setShowDescription(true);
        setCurrentCourseIndex(courseIndex);
        setCurrentChapterIndex(chapterIndex);
        setExpandedCourses(courseIndex);
        setShowAllCourses(false); // Hide AllCoursesSection when a chapter is selected
    };

    const handleShowAllCourses = () => {
        setShowAllCourses(!showAllCourses); // Toggle AllCoursesSection visibility
    };

    const handleNextChapter = () => {
        const currentCourse = courses[currentCourseIndex];
        const currentUnit = currentCourse.units[currentChapterIndex];
        const nextLessonIndex = currentChapterIndex + 1;

        if (currentCourse && currentCourse.units) {
            if (nextLessonIndex < currentUnit.lessons.length) {
                handleChapterClick(currentUnit.lessons[nextLessonIndex], currentCourseIndex, currentChapterIndex, nextLessonIndex);
            } else {
                const nextUnitIndex = currentCourseIndex + 1;
                if (nextUnitIndex < currentCourse.units.length) {
                    handleChapterClick(currentCourse.units[nextUnitIndex].lessons[0], currentCourseIndex, nextUnitIndex, 0);
                }
            }
        }
    };

    const handlePrevChapter = () => {
        const currentCourse = courses[currentCourseIndex];
        const currentUnit = currentCourse.units[currentChapterIndex];
        const prevLessonIndex = currentChapterIndex - 1;

        if (currentCourse && currentCourse.units) {
            if (prevLessonIndex >= 0) {
                handleChapterClick(currentUnit.lessons[prevLessonIndex], currentCourseIndex, currentChapterIndex, prevLessonIndex);
            } else {
                const prevUnitIndex = currentCourseIndex - 1;
                if (prevUnitIndex >= 0) {
                    const lastLessonIndex = currentCourse.units[prevUnitIndex].lessons.length - 1;
                    handleChapterClick(currentCourse.units[prevUnitIndex].lessons[lastLessonIndex], currentCourseIndex, prevUnitIndex, lastLessonIndex);
                } else {
                    const lastCourseIndex = courses.length - 1;
                    const lastUnitIndex = courses[lastCourseIndex].units.length - 1;
                    const lastLessonIndex = courses[lastCourseIndex].units[lastUnitIndex].lessons.length - 1;
                    handleChapterClick(courses[lastCourseIndex].units[lastUnitIndex].lessons[lastLessonIndex], lastCourseIndex, lastUnitIndex, lastLessonIndex);
                }
            }
        }
    };

    return (
        <div className="flex flex-row-reverse h-screen">
            <CourseSidebar
                courses={courses}
                expandedCourses={expandedCourses}
                toggleChapters={toggleChapters}
                handleChapterClick={handleChapterClick}
            />
            <MainContent
                selectedChapterName={selectedChapterName}
                selectedVideo={selectedVideo}
                selectedDescription={selectedDescription}
                showDescription={showDescription}
                setShowDescription={setShowDescription}
                onNextChapter={handleNextChapter}
                courses={courses}
                currentCourseIndex={currentCourseIndex}
                handleChapterClick={handleChapterClick}
                currentChapterIndex={currentChapterIndex}
                onPrevChapter={handlePrevChapter}
                showAllCourses={showAllCourses} // Pass showAllCourses state
                setShowAllCourses={setShowAllCourses} // Pass setShowAllCourses function
            />
        </div>
    );
};

export default SideBar;