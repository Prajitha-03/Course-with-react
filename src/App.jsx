import './App.css'
import SideBar from './components/SideBar'
import data from './data/data.json'; // Import data.json
import Main from './components/Main'
function App() {
  const handleSelectCourse = (course) => {
    console.log('Selected course:', course);
  }

  return (
    <>
      <Main />
      {data.length > 0 && <SideBar courses={data} onclick={handleSelectCourse} />}
    </>
  )
}

export default App
