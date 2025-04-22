<<<<<<< HEAD
import './App.css'
import SideBar from './components/SideBar'
import data from './data/data.json'; // Import data.json
=======

import './App.css'
import SideBar from './components/SideBar'
import courses from './data/courses'
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
import Main from './components/Main'
function App() {
  const handleSelectCourse = (course) => {
    console.log('Selected course:', course);
  }
<<<<<<< HEAD

  return (
    <>
      <Main />
      <SideBar courses={data} onclick={handleSelectCourse} />
=======
  return (
    <>
      <Main />
      <SideBar courses={courses} onclick={handleSelectCourse} />
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
    </>
  )
}

export default App
