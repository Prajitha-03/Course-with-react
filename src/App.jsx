import './App.css';
import SideBar from './components/SideBar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/data/data.json')
      .then(res => {
        setCourses(res.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
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
