import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Tracker from './pages/tracker.js'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Tracker />} />
      </Routes>
    </div>
  )
 
}
export default App;
