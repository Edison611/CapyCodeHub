import {Route, Routes} from 'react-router-dom'
import "./App.css"
import Tracker from './pages/postrack/tracker.js'
import PathRecord from './pages/postrack/pathRecord'
import Home from './pages/home'
import Scouting from './pages/scouting'
import Vexvia from './pages/vexvia'
import EventHome from './pages/vexvia/eventHome'
import Matches from './pages/vexvia/matches'
import Skills from './pages/vexvia/skills'
import CodeGenerator from './pages/postrack/codeGenerator'
import Awards from './pages/vexvia/Awards'
import TeamHome from './pages/teams/TeamHome.js'
import TeamCompetition from './pages/teams/TeamCompetition.js'
import DivisionPredictor from './pages/division-predictor.js'
import MSDivisionPredictor from './pages/ms-division-predictor.js'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/path-record" element={<PathRecord />} />
        <Route path="/code-generator" element={<CodeGenerator />} />
        <Route path="/scouting" element={<Scouting />} />
        <Route path="/vexvia" element={<Vexvia />} />
        <Route path="/vexvia/comps/:event_id" element={<EventHome />} />
        <Route path="/vexvia/comps/:event_id/skills" element={<Skills />} />
        <Route path="/vexvia/comps/:event_id/division/:division_id/matches" element={<Matches />} />
        <Route path="/vexvia/comps/:event_id/awards" element={<Awards />} />
        <Route path="/vexvia/teams/:team_id/" element={<TeamHome />} />
        <Route path="/vexvia/teams/:team_id/:event_id" element={<TeamCompetition/>} />
        <Route path="/predictor/" element={<DivisionPredictor />} />
        <Route path="/predictorMS/" element={<MSDivisionPredictor />} />
      </Routes>
    </div>
  )
 
}
export default App;
