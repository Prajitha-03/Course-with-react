import React from 'react'
import './Main.css'
const Main = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => window.location.reload()}
      >EduVance</div>
      <div className="hidden md:flex space-x-6">
        <a href="#">Home</a>
        <a href="#">Courses</a>
        <a href="#">Categories</a>
        <input type="text" placeholder="Search" className="px-2 py-1 rounded text-white" />
      </div>
      <div className="flex space-x-4">
        <button className="hover:text-gray-400">Log In</button>
        <button className="bg-gray-600 px-4 py-2 rounded hover:bg-blue-700">Sign Up</button>
      </div>
    </nav>
  );
};

export default Main

