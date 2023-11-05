import React from 'react';
import "../component-styles/PosTrackNavbar.css"
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"


const PosTrackNavbar = () => {
    const navigate = useNavigate();
    return (
        <div className='side-nav-container'>
            <img src={logo} onClick={ () => navigate("/")} alt="" className='logo'></img>
            <div className='navigation'>
                <button className="button-42" onClick={ () => navigate("/tracker")} >Robot Position</button>
                <button className="button-42" onClick={ () => navigate("/path-record")} >Path Visualizer</button>
                <button className="button-42" onClick={ () => navigate("/code-generator")} >Code Generator</button>
            </div>
        </div>
    )
}

export default PosTrackNavbar;