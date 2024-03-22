import React from 'react';
import "../component-styles/MainNavBar.css"
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"


const MainNavbar = () => {
    const navigate = useNavigate();
    return (
        <div className='main-nav-container'>
            <img src={logo} onClick={ () => navigate("/")} alt="" className='logo'></img>
            <div className='navigation'>
                <button className="button-nav" onClick={ () => navigate("/tracker")} >Robot Position</button>
                <button className="button-nav" onClick={ () => navigate("/path-record")} >Path Visualizer</button>
                <button className="button-nav" onClick={ () => navigate("/code-generator")} >Code Generator</button>
            </div>
        </div>
    )
}

export default MainNavbar;