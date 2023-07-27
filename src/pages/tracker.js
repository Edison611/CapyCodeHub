import React from "react";
import "./tracker.css";
import { useState, useEffect } from 'react';
import field from '../images/field.png'
import skills_field from '../images/skills-field.png'
import ToggleSwitch from '../components/ToggleSwitch';

const Tracker = () => {
    const [localMousePos, setLocalMousePos] = useState({});
    const [skills, setSkills] = useState(false);

    const handleMouseMove = (event) => {
        // 👇 Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };

    function convert_coord(x, y) {
        x = (((x - (windowSize[0]/5))/3.542) * 1280/windowSize[0]).toFixed(0);
        y = ((-(y - (windowSize[1]/2.25))/3.2361) * 585/windowSize[1]).toFixed(0);
        return [x, ", ",y]
    }

    const handleToggle = (switchState) => {
        setSkills(switchState);
    };

    const imageToShow = skills
        ? skills_field
        : field;

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (  
        <div>
        <div className='skills'>
        <ToggleSwitch label="Skills: " onToggle={handleToggle}/>
        </div>
        <div className='stats'>
            Bot Width:
            <form>
                <input type='' />
            </form>
            Bot Length:
            <form>
                <input type='' />
            </form>
            <div className='save-button'>
            <button className='button-29'>Save</button>
            </div>
        </div>
        <div className='container_main'>
            {/* <form>
            <label> Enter Coordinates:
                <input type="test" />
            </label>
            </form> */}
            
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

export default Tracker