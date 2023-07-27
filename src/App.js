import { useState } from 'react';
import field from './images/field.png'
import skills_field from './images/skills-field.png'
import "./App.css"
import ToggleSwitch from './components/ToggleSwitch';

function App() {
  const [localMousePos, setLocalMousePos] = useState({});
  const [skills, setSkills] = useState(false);

  const handleMouseMove = (event) => {
    // 👇 Get mouse position relative to element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  };

  function convert_coord(x, y) {
    x = ((x - 256)/3.542).toFixed(0);
    y = (-(y - 234)/3.2361).toFixed(0);
    return [x, ", ",y]
  }

  const handleToggle = (switchState) => {
    setSkills(switchState);
  };

  const imageToShow = skills
    ? skills_field
    : field;

  function convert_image(state) {
    if (state === true) {
      return {field}
    }
    else {
      return {skills_field}
    }
  }

  return (  
    <div>
      <div className='skills'>
      <ToggleSwitch label="Skills: " onToggle={handleToggle}/>
      </div>
      <div className='container_main'>
        <form>
          <label> Enter Coordinates:
            <input type="test" />
          </label>
        </form>
        
        {<img src={imageToShow} className='field' alt="" onMouseMove={handleMouseMove}></img>}
        <br />
        <div className='coord'>
          Position:
          <b>
            ({convert_coord(localMousePos.x, localMousePos.y)})
          </b>
        </div>
      </div>
    </div>
  );
}
export default App;
