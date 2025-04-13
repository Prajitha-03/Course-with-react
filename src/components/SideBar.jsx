import React, { useState } from 'react';
import CourseSidebar from './CourseSidebar';
import MainContent from './MainContent';
import './SideBar.css';

const SideBar = ({ courses }) => {
    const [expandedCourses, setExpandedCourses] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedChapterName, setSelectedChapterName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [showDescription, setShowDescription] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState({});
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [showAllCourses, setShowAllCourses] = useState(false); // State to show AllCoursesSection

    const toggleChapters = (index) => {
        setExpandedCourses(expandedCourses === index ? null : index);
    };

    const handleChapterClick = (chapter, courseIndex, chapterIndex) => {
        setSelectedVideo(chapter.videoUrl);
        setSelectedChapterName(chapter.name);
        setSelectedDescription(chapter.description || 'No description available.');
        setSelectedQuiz(chapter.quiz || []);
        setShowDescription(true);
        setShowQuiz(false);
        setSelectedAnswers({});
        setQuizResults({});
        setCurrentCourseIndex(courseIndex);
        setCurrentChapterIndex(chapterIndex);
        setExpandedCourses(courseIndex);
        setShowAllCourses(false); // Hide AllCoursesSection when a chapter is selected
    };

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

    const handleShowAllCourses = () => {
        setShowAllCourses(!showAllCourses); // Toggle AllCoursesSection visibility
    };

    const handleNextChapter = () => {
        const currentCourse = courses[currentCourseIndex];
        const nextChapterIndex = currentChapterIndex + 1;

        if (currentCourse && currentCourse.chapters) {
            if (nextChapterIndex < currentCourse.chapters.length) {
                handleChapterClick(currentCourse.chapters[nextChapterIndex], currentCourseIndex, nextChapterIndex);
            } else {
                const nextCourseIndex = currentCourseIndex + 1;
                if (nextCourseIndex < courses.length) {
                    handleChapterClick(courses[nextCourseIndex].chapters[0], nextCourseIndex, 0);
                }
            }
        }
    };

    const handlePrevChapter = () => {
        const currentCourse = courses[currentCourseIndex];
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
                selectedQuiz={selectedQuiz}
                showDescription={showDescription}
                showQuiz={showQuiz}
                setShowDescription={setShowDescription}
                setShowQuiz={setShowQuiz}
                selectedAnswers={selectedAnswers}
                quizResults={quizResults}
                handleAnswerSelect={handleAnswerSelect}
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