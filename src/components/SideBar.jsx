import React, { useState } from 'react';
<<<<<<< HEAD
import CourseSidebar from './CourseSideBar';
=======
import CourseSidebar from './CourseSidebar';
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
import MainContent from './MainContent';
import './SideBar.css';

const SideBar = ({ courses }) => {
    const [expandedCourses, setExpandedCourses] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedChapterName, setSelectedChapterName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
<<<<<<< HEAD
    const [showDescription, setShowDescription] = useState(true);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [showAllCourses, setShowAllCourses] = useState(false); 
=======
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [showDescription, setShowDescription] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [showAllCourses, setShowAllCourses] = useState(false); // State to show AllCoursesSection
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73

    const toggleChapters = (index) => {
        setExpandedCourses(expandedCourses === index ? null : index);
    };
<<<<<<< HEAD
    

    const handleChapterClick = (chapter, courseIndex, unitIndex, lessonIndex) => {
        setSelectedVideo(chapter.videoUrl);
        setSelectedChapterName(chapter.title);
        setSelectedDescription(chapter.description || 'No description available.');
        setShowDescription(true);
=======

    const handleChapterClick = (chapter, courseIndex, chapterIndex) => {
        setSelectedVideo(chapter.videoUrl);
        setSelectedChapterName(chapter.name);
        setSelectedDescription(chapter.description || 'No description available.');
        setSelectedQuiz(chapter.quiz || []);
        setShowDescription(true);
        setShowQuiz(false);
        setSelectedAnswers({});
        setQuizResults({});
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
        setCurrentCourseIndex(courseIndex);
        setCurrentChapterIndex(chapterIndex);
        setExpandedCourses(courseIndex);
        setShowAllCourses(false); // Hide AllCoursesSection when a chapter is selected
    };

<<<<<<< HEAD
=======
    const handleAnswerSelect = (questionIndex, selectedOption) => {
        const correctAnswer = selectedQuiz[questionIndex]?.answer;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOption,
        }));
        setQuizResults((prev) => ({
            ...prev,
            [questionIndex]: selectedOption === correctAnswer,
        }));
    };

>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
    const handleShowAllCourses = () => {
        setShowAllCourses(!showAllCourses); // Toggle AllCoursesSection visibility
    };

    const handleNextChapter = () => {
        const currentCourse = courses[currentCourseIndex];
<<<<<<< HEAD
        const currentUnit = currentCourse.units[currentChapterIndex];
        const nextLessonIndex = currentChapterIndex + 1;

        if (currentCourse && currentCourse.units) {
            if (nextLessonIndex < currentUnit.lessons.length) {
                handleChapterClick(currentUnit.lessons[nextLessonIndex], currentCourseIndex, currentChapterIndex, nextLessonIndex);
            } else {
                const nextUnitIndex = currentCourseIndex + 1;
                if (nextUnitIndex < currentCourse.units.length) {
                    handleChapterClick(currentCourse.units[nextUnitIndex].lessons[0], currentCourseIndex, nextUnitIndex, 0);
=======
        const nextChapterIndex = currentChapterIndex + 1;

        if (currentCourse && currentCourse.chapters) {
            if (nextChapterIndex < currentCourse.chapters.length) {
                handleChapterClick(currentCourse.chapters[nextChapterIndex], currentCourseIndex, nextChapterIndex);
            } else {
                const nextCourseIndex = currentCourseIndex + 1;
                if (nextCourseIndex < courses.length) {
                    handleChapterClick(courses[nextCourseIndex].chapters[0], nextCourseIndex, 0);
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
                }
            }
        }
    };

    const handlePrevChapter = () => {
        const currentCourse = courses[currentCourseIndex];
<<<<<<< HEAD
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
=======
        const prevChapterIndex = currentChapterIndex - 1;

        if (currentCourse && currentCourse.chapters) {
            if (prevChapterIndex >= 0) {
                handleChapterClick(currentCourse.chapters[prevChapterIndex], currentCourseIndex, prevChapterIndex);
            } else {
                const prevCourseIndex = currentCourseIndex - 1;
                if (prevCourseIndex >= 0) {
                    const lastChapterIndex = courses[prevCourseIndex].chapters.length - 1;
                    handleChapterClick(courses[prevCourseIndex].chapters[lastChapterIndex], prevCourseIndex, lastChapterIndex);
                } else {
                    const lastCourseIndex = courses.length - 1;
                    const lastChapterIndex = courses[lastCourseIndex].chapters.length - 1;
                    handleChapterClick(courses[lastCourseIndex].chapters[lastChapterIndex], lastCourseIndex, lastChapterIndex);
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
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
<<<<<<< HEAD
                showDescription={showDescription}
                setShowDescription={setShowDescription}
=======
                selectedQuiz={selectedQuiz}
                showDescription={showDescription}
                showQuiz={showQuiz}
                setShowDescription={setShowDescription}
                setShowQuiz={setShowQuiz}
                selectedAnswers={selectedAnswers}
                quizResults={quizResults}
                handleAnswerSelect={handleAnswerSelect}
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
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