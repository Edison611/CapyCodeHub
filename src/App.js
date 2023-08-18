import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Tracker from './pages/tracker.js'
import PathRecord from './pages/pathRecord'
import Home from './pages/home'
import Scouting from './pages/scouting'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/path-record" element={<PathRecord />} />
        <Route path="/scouting" element={<Scouting />} />
      </Routes>
    </div>
  )
 
}
export default App;
