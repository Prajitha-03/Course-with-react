import './App.css';
import SideBar from './components/SideBar';
import Main from './components/Main';
import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(json => setCourses(json))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSelectCourse = (course) => {
    console.log('Selected course:', course);
  };

  return (
    <>
      <Main />
      <SideBar courses={courses} onclick={handleSelectCourse} />
    </>
  );
}

export default App;
