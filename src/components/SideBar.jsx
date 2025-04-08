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

    const toggleChapters = (index) => {
        setExpandedCourses(expandedCourses === index ? null : index);
    };

    const handleChapterClick = (chapter) => {
        setSelectedVideo(chapter.videoUrl);
        setSelectedChapterName(chapter.name);
        setSelectedDescription(chapter.description || 'No description available.');
        setSelectedQuiz(chapter.quiz || []);
        setShowDescription(true);
        setShowQuiz(false);
        setSelectedAnswers({});
        setQuizResults({});
    };

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        const correctAnswer = selectedQuiz[questionIndex].answer;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOption,
        }));
        setQuizResults((prev) => ({
            ...prev,
            [questionIndex]: selectedOption === correctAnswer,
        }));
    };

    return (
        <div className="flex h-screen">
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
            />
        </div>
    );
};

export default SideBar;