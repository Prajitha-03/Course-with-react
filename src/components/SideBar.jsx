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
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleChapters = (index) => {
    setExpandedCourses(expandedCourses === index ? null : index);
  };

  const handleChapterClick = (chapter, courseIndex, chapterIndex) => {
    if (chapter.type === 'quiz') {
      setSelectedQuiz(chapter);
      setShowQuiz(true);
      setSelectedVideo(null);
      setShowDescription(false);
    } else {
      setSelectedVideo(chapter.videoUrl);
      setSelectedChapterName(chapter.name);
      setSelectedDescription(chapter.description || 'No description available.');
      setShowDescription(true);
      setSelectedQuiz(null);
      setShowQuiz(false);
    }

    setCurrentCourseIndex(courseIndex);
    setCurrentChapterIndex(chapterIndex);
    setExpandedCourses(courseIndex);
    setShowAllCourses(false);
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
        showDescription={showDescription}
        setShowDescription={setShowDescription}
        onNextChapter={handleNextChapter}
        onPrevChapter={handlePrevChapter}
        courses={courses}
        currentCourseIndex={currentCourseIndex}
        currentChapterIndex={currentChapterIndex}
        showAllCourses={showAllCourses}
        setShowAllCourses={setShowAllCourses}
        handleChapterClick={handleChapterClick}
        showQuiz={showQuiz}
        selectedQuiz={selectedQuiz}
        setShowQuiz={setShowQuiz}
      />
    </div>
  );
};

export default SideBar;
