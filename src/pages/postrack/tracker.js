import React from "react";
import "../../page-styles/postrack/tracker.css";
import { useState, useEffect } from 'react';
import field from '../../images/HighStakesField.png'
import skills_field from "../../images/HighStakesSkillsField.png";
import ToggleSwitch from '../../components/ToggleSwitch';
import BotDrawer from '../../components/BotDrawer'
import PosTrackNavbar from "../../components/PosTrackNavbar";

const Tracker = () => {
    const [localMousePos, setLocalMousePos] = useState({});
    const [skills, setSkills] = useState(false);

    const handleMouseMove = (event) => {
        // 👇 Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };

    function mouseToCoord(x, y) {
        x = (((x - (windowSize[0]/5))/3.542) * 1280/windowSize[0]).toFixed(0);
        y = ((-(y - (windowSize[1]/2.25))/3.2361) * 585/windowSize[1]).toFixed(0);
        return [x, ", ",y]
    }

    function coordToMouse(x, y) {
        x = ((x * 3.542 * windowSize[0])/(1280)+windowSize[0]/5) + windowSize[0]/3.3333;
        y = -((y * 3.2361 * windowSize[1])/585 - windowSize[1]/2.25);
        return [x, y]
    }

    function valToSize(w, h) {
        w = w * 3.542 * windowSize[0]/1280;
        h = h * 3.542 * windowSize[1]/585;
        return [w, h]
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

    // Add the width and height states for the square
    const [squareWidth, setSquareWidth] = useState(12);
    const [squareHeight, setSquareHeight] = useState(14);

    const [startPos, setStartPos] = useState([0, 0]);

    const handleSquareWidthChange = (event) => {
        setSquareWidth(parseInt(event.target.value));
    };

    const handleSquareHeightChange = (event) => {
        setSquareHeight(parseInt(event.target.value));
    };

    const handleStartingPosX = (event) => {
        setStartPos([parseInt(event.target.value), startPos[1]])
    }

    const handleStartingPosY = (event) => {
        
        setStartPos([startPos[0], parseInt(event.target.value)])
    }

    const [squareRotation, setSquareRotation] = useState(0);

    const handleSquareRotationChange = (event) => {
        setSquareRotation(parseInt(event.target.value));
    };

    var position = mouseToCoord(localMousePos.x, localMousePos.y)
    var botPosition = coordToMouse(startPos[0], startPos[1])
    var botSize = valToSize(squareWidth, squareHeight);

    const [showText, setShowText] = useState(false);

    // Handler function for toggling text display
    const handleToggleText = () => {
        setShowText((prevState) => !prevState);
      };

    return (  
        <div>
        <PosTrackNavbar />
        <div className='skills'>
        <ToggleSwitch label="Skills: " onToggle={handleToggle}/>
        </div>
        <div className='stats'>
            <div>
            {/* Input fields for square width and height */}
            <label htmlFor="squareWidth">Bot Width: </label>
            <input
                className="botStats"
                type="number"
                id="squareWidth"
                value={squareWidth}
                onChange={handleSquareWidthChange}
            />
            </div>
            <div>
                <label htmlFor="squareHeight">Bot Length: </label>
                <input
                    className="botStats"
                    type="number"
                    id="squareHeight"
                    value={squareHeight}
                    onChange={handleSquareHeightChange}
                />
            </div>
            <div>
                <label htmlFor="">X: </label>
                <input
                    className="botStats"
                    type="number"
                    id="startingX"
                    value={startPos[0]}
                    onChange={handleStartingPosX}
                />
                <label>Y: </label>
                <input
                    className="botStats"
                    type="number"
                    min="-72"
                    max="72"
                    id="startingY"
                    value={startPos[1]}
                    onChange={handleStartingPosY}
                />
                <label>θ: </label>
                <input
                    className="botStats"
                    type="number"
                    min="-360"
                    max="360"
                    id="angle"
                    value={squareRotation}
                    onChange={handleSquareRotationChange}
                />
            </div>
            <div className="toggle-container">
            Show text:
                <input
                    type="checkbox"
                    id="toggleText"
                    checked={showText}
                    onChange={(e) => handleToggleText(e.target.checked)}
                />
                <label htmlFor="toggleText" className="toggle-label">
                    <span className="toggle-text">
                        {showText ? '' : ''}
                    </span>
                </label>
            </div>
            {/* <div className='save-button'>
            <button className='button-29'>Save</button>
            </div> */}
        </div>
        <div className='container_main'>
            {/* <form>
            <label> Enter Coordinates:
                <input type="test" />
            </label>
            </form> */}
            
            {<img src={imageToShow} className='remove-all field' alt="" onMouseMove={handleMouseMove}></img>}
            <br />
            <div className='coord'>
            Position:
            <b>
                ({position})
            </b>
            </div>
            <BotDrawer
                x={(botPosition[0] - botSize[0] / 2)}
                y={(botPosition[1] - botSize[1] / 2)}
                width={botSize[0]}
                height={botSize[1]}
                rotation={squareRotation}
                showText={showText}
            />
        </div>
        </div>
    );
}

export default Tracker
