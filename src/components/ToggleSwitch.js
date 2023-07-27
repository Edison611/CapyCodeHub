import React from "react";
import "./ToggleSwitch.css";
import { useState } from "react";
  
const ToggleSwitch = ({ label, onToggle}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggle = () => {
    setIsSwitchOn(!isSwitchOn);
    onToggle(!isSwitchOn); // Pass the updated state to the parent component
  };


  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" 
               name={label} id={label} onChange={handleToggle} checked={isSwitchOn}/>
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;