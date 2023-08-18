import React from 'react';
import "../component-styles/Navbar.css"
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <img src={logo} onClick={ () => navigate("/")} alt="" className='logo'></img>
            <div className='navigation'>
                <button className="button-42" onClick={ () => navigate("/tracker")} >Robot Position</button>
                <br />
                <br />
                <button className="button-42" onClick={ () => navigate("/path-record")} >Path Visualizer</button>
            </div>
        </div>
    )
}

export default Navbar;