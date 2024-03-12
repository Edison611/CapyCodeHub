import React from "react";
import "../../page-styles/postrack/tracker.css";
import "../../page-styles/postrack/codeGenerator.css";
import { useState, useEffect, useRef } from 'react';
import field from '../../images/field.png'
import skills_field from '../../images/skills-field.png'
import ToggleSwitch from '../../components/ToggleSwitch';
import BotDrawer from '../../components/BotDrawer'
import PosTrackNavbar from "../../components/PosTrackNavbar";


const CodeGenerator = () => {
    const [localMousePos, setLocalMousePos] = useState({});
    const [skills, setSkills] = useState(false);
    const [code, setCode] = useState([])
    const textareaRef = useRef(null);
    

    const copyToClipboard = () => {
        if (textareaRef.current) {
          textareaRef.current.select();
          document.execCommand('copy');
        }
      };

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
    const [squareWidth, setSquareWidth] = useState(10);
    const [squareHeight, setSquareHeight] = useState(12);

    const handleSquareWidthChange = (event) => {
        setSquareWidth(parseInt(event.target.value));
    };

    const handleSquareHeightChange = (event) => {
        setSquareHeight(parseInt(event.target.value));
    };
    var position = mouseToCoord(localMousePos.x, localMousePos.y)
    var botSize = valToSize(squareWidth, squareHeight);

    const [showText, setShowText] = useState(false);

    // Handler function for toggling text display
    const handleToggleText = () => {
        setShowText((prevState) => !prevState);
      };
    

    const [coordinatesText, setCoordinatesText] = useState("");
    const [coordinatesList, setCoordinatesList] = useState([]);
    const [currentCoordIndex, setCurrentCoordIndex] = useState(0);

    // Parse the coordinates entered in the text box
    const handleCoordinatesChange = (event) => {
        setCoordinatesText(event.target.value);
    };

    // Function to split the coordinates text and update the coordinatesList state
    const updateCoordinatesList = () => {
        const coords = coordinatesText.trim().split("\n");
        setCoordinatesList(coords);
        setCurrentCoordIndex(0);
        console.log(coords)
        var prev = [0, 0, 0]
        const codeLines = coords.map((coord, i) => {
            const [x, y, angle] = coord.split(",").map(item => item.trim());
            var timeout = Math.round(Math.sqrt(Math.pow(x-prev[0], 2) + Math.pow(y-prev[1], 2)) * 1200/24 + 250); // 1000 / 24 is the speed of bot (time / inches)
            if (timeout < 800) {
                timeout = 800
            }
            prev = [x, y, angle]
            if (i === 0) {
              return `chassis.setPose(${x}, ${y}, ${angle});`;
            }
        
            return `\nchassis.moveTo(${x}, ${y}, ${angle}, ${timeout});`;
          });
        setCode(codeLines)
    };

    // Function to handle forward and backward buttons to show next/previous coordinates
    const handleNextCoordinate = () => {
    setCurrentCoordIndex((prevIndex) =>
        prevIndex < coordinatesList.length - 1 ? prevIndex + 1 : prevIndex
    );
    };

    const handlePreviousCoordinate = () => {
    setCurrentCoordIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };


    var botPosition = coordToMouse(
        currentCoordIndex < coordinatesList.length ? parseInt(coordinatesList[currentCoordIndex].split(",")[0]) : 0,
        currentCoordIndex < coordinatesList.length ? parseInt(coordinatesList[currentCoordIndex].split(",")[1]) : 0
    )
    

    return (  
    <div>
        <PosTrackNavbar />
        <div className='skills'>
        <ToggleSwitch label="Skills: " onToggle={handleToggle}/>
        </div>  
        <div className="coordinates-box">
            <h2>Lemlib Code:</h2>
            <textarea
                ref={textareaRef}
                rows="5"
                cols="30"
                value={code.join("")}
            />
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
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
            <br /><br />
            Enter Coordinates: <br></br>
            ("x, y, angle")
            <div>
                <textarea
                    rows="5"
                    cols="30"
                    value={coordinatesText}
                    onChange={handleCoordinatesChange}
                />
            </div>
            <div>
                <button onClick={updateCoordinatesList}>Update Coordinates</button>
                <button onClick={handlePreviousCoordinate}>Backward</button>
                <button onClick={handleNextCoordinate}>Forward</button>
            </div>
        </div>
        <div className='container_main'>
            {<img src={imageToShow} className='field' alt="field" onMouseMove={handleMouseMove} />}
            
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
                rotation={currentCoordIndex < coordinatesList.length ? parseInt(coordinatesList[currentCoordIndex].split(",")[2]) : 0}
                showText={showText}
            />
            
        </div>
    </div>
    );
}

export default CodeGenerator