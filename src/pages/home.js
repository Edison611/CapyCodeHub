// HomePage.js
import React from 'react';
import logo from '../images/field.png';
import "../page-styles/home.css";
import "../styles/general.css";
import "../styles/buttons.css";
import Hero from '../components/HeroBg';
import HeroLink from '../components/HeroLink';
import field from '../images/field.png';
import scouting from "../images/scouting.png";
import MainNavbar from '../components/MainNavbar';

const Home = () => {
  return (
    <div>
      <MainNavbar />
      <Hero image={logo} title={"Capybaras (2055) Programming Website"} />
    
      <main>
      <section className="project-info">
          <div className='subheader'>Welcome to 2055's Programming Website!</div>
          <div className='text'>
            This is a website that helps with programming for Vex Robotics Competitions (VRC). Inspired by features on Lemlib to help users understand the precise placements of their robots on the field. 
          </div>
          <div className='text'>
            It also includes an online replica of the Vex Via app, which is a scouting app that allows users to record data about other teams and events. No installations are required!
          </div>
      </section>

      <HeroLink image={field} title={"Robot Position Tracker"} text={"A webpage to help with figuring out the placement of robots"} buttons={[{name: "Robot Position Tracker", link: "/tracker"}, {name: "Path Visualizer", link: "/path-record"}, {name: "Code Generator", link: "/code-generator"}]} />
      <br />
      <HeroLink image={scouting} title={"Scouting"} text={"A webpage to help with scouting"} buttons={[{name: "Scouting", link: "/vexvia/teams"}, {name: "Vex Via", link: "/vexvia"}, {name: "HS Worlds Division Predictor", link: "/predictor"}, {name: "MS Worlds Division Predictor", link: "/predictorMS"}]} />
        
        <section className="contact">
          <div className='subheader'>Contact Us</div>
          <div className='text'>
            Visit us at www.2055vrc.live or find us on our instagram @2055vrc. 
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Mi3L Schools. All rights reserved. Made by Edison Ying</p>
      </footer>
    </div>
  );
};

export default Home;
