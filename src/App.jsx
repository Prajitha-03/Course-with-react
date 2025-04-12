import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/SideBar'
import courses from './data/courses'
import Main from './components/Main'
function App() {
  const handleSelectCourse = (course) => {
    console.log('Selected course:', course);
  }
  return (
    <>
      <Main/>
      <SideBar courses={courses} onclick={handleSelectCourse} />
    </>
  )
}

export default App
