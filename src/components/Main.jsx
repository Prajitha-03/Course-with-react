import React from 'react'
import './Main.css'
const Main = () => {
  return (
    <div className="main-header">
      <div className="logo">
        <h1>EduVance</h1>
      </div>

      <nav className="nav-bar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Main
