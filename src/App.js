import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Tracker from './pages/tracker.js'
import PathRecord from './pages/pathRecord'
import Home from './pages/home'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/path-record" element={<PathRecord />} />
      </Routes>
    </div>
  )
 
}
export default App;
