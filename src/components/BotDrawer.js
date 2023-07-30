import React from "react";

const BotDrawer = ({ x, y, width, height, rotation, showText }) => {
    const squareStyle = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: 'red',
      opacity: 0.8,
      transform: `rotate(${rotation}deg)`, // Apply rotation to the square
      pointerEvents: 'none', // Make the square non-interactable
    };
  
    const topLineStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '1px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    const bottomLineStyle = {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '1px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    const textStyle = {
      fontSize: '1.2vw',
      fontWeight: 'bold',
      color: 'yellow',
      textTransform: 'uppercase',
      padding: '2px 6px',
      opacity: 1,
      display: showText ? 'block' : 'none',
    };
  
    return (
        <div style={squareStyle}>
        <div style={topLineStyle}>
          <div style={textStyle}>FRONT</div>
        </div>
        <div style={bottomLineStyle}>
          <div style={textStyle}>BACK</div>
        </div>
      </div>
    );
  };

export default BotDrawer;