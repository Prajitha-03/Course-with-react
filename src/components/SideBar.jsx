import React, { useState } from 'react';
import './SideBar.css';

const SideBar = ({ courses }) => {
    const [expandedCourses, setExpandedCourses] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedChapterName, setSelectedChapterName] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const toggleChapters = (index) => {
        setExpandedCourses(expandedCourses === index ? null : index);
    };

    const handleChapterClick = (chapters) => {
        setSelectedVideo(chapters.videoUrl);
        setSelectedChapterName(chapters.name);
        setSelectedDescription(chapters.description || 'No desccription'); 
    };

    return (
        <div className="main-container">
            <div className="sidebar">
                <h2>Courses</h2>
                <ul>
                    {courses.map((courses, index) => (
                        <li key={index}>
                            <div onClick={() => toggleChapters(index)} >
                                {courses.name}
                            </div>
                            {expandedCourses === index && courses.chapters && (
                                <ul className="chapters">
                                    {
                                    courses.chapters.map((chapters, chaptersIndex) => (
                                        <li
                                            key={chaptersIndex}
                                            onClick={() => handleChapterClick(chapters)}
                                        >
                                            {chapters.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="video-container">
            {selectedChapterName && (
                    <h3 className="chapter-title">{selectedChapterName}</h3> // Display the chapter name
                )}
                {selectedVideo ? (
                    <iframe
                        src={selectedVideo}
                        title="Video Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Select a chapter to watch the video</p>
                )}
                {selectedDescription &&
                 <div className="description-box">
                <div>
                    <h4>Description</h4>
                <p>{selectedDescription}</p>
                    </div>
            </div>}
                
            </div>
            
        </div>
    );
};

export default SideBar;