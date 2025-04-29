import React from 'react';
import AllCoursesSection from './AllCoursesSection';

const MainContent = ({
  selectedChapterName,
  selectedVideo,
  selectedDescription,
  showDescription,
  setShowDescription,
  onNextChapter,
  courses,
  handleChapterClick,
  onPrevChapter,
  showAllCourses,
  setShowAllCourses,
}) => {
  return (
    <div className="flex-1 p-4 bg-white max-h-screen overflow-y-auto cursor-pointer">
      <div className="mt-4 flex justify-between">
        
        {selectedChapterName && (
          <button
            onClick={onPrevChapter}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-300 text-white"
          >
            <span className="text-xl text-gray-700">&lt;</span>
          </button>
        )}
        {selectedVideo ? (
          <div className="w-full max-w-5xl mx-auto aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src={selectedVideo}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chapter to watch the video</p>
          </div>
        )}
        {selectedChapterName && (
          <button
            onClick={onNextChapter}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-300 text-white"
          >
            <span className="text-xl text-gray-700">&gt;</span>
          </button>
        )}
      </div>

      {selectedVideo && (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => {
              setShowDescription(true);
              setShowAllCourses(false);
            }}
            className={`px-4 py-2 rounded-md shadow-md ${
              showDescription
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Description
          </button>


          <button
            onClick={() => {
              setShowDescription(false);
              setShowAllCourses(true);
            }}
            className={`px-4 py-2 rounded-md shadow-md ${
              showAllCourses
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            All Courses
          </button>
        </div>
      )}

      {showDescription && selectedDescription && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <h4 className="text-lg font-medium mb-2">Description</h4>
          <p className="text-gray-600">{selectedDescription}</p>
        </div>
      )}

      {showAllCourses && (
        <div className="mt-4">
          <AllCoursesSection
            courses={courses}
            handleChapterClick={handleChapterClick}
          />
        </div>
      )}
    </div>
  );
};

export default MainContent;
