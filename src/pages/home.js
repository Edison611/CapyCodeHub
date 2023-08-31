// HomePage.js
import React from 'react';
import "../page-styles/home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <h1>Under Construction 🚧</h1>
        <p>A website to help with programming for VEX Robotics. Made with help from ChatGPT</p>
      </header>
      <main>
      <section id="tracker" className="project-info">
          <h2>Welcome to 2055's Programming Website!</h2>
          <p>
            This is a website that helps with programming for Vex Robotics Competitions (VRC)
          </p>
      </section>

        <section className="hero">
          <div className="hero-content">
            <h2>Robot Position Tracker</h2>
            <p>A webpage to help with figuring out the placement of robots</p>
            <div className=''>
                <button className="button-42" onClick={ () => navigate("/tracker")} >Robot Position</button>
                <br />
                <br />
                <button className="button-42" onClick={ () => navigate("/path-record")} >Path Visualizer</button>
            </div>
          </div>
        </section>
        <br />

        <section className="scouting">
          <div className="scouting-content">
            <h2>Scouting</h2>
            <p>A webpage to help with scouting</p>
            <div className=''>
                <button className="button-42" onClick={ () => navigate("/scouting")} >Scouting</button>
                <button className="button-42" onClick={ () => navigate("/vexvia")} >Vex Via</button>
            </div>
          </div>
        </section>
        

        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            Provide a way for users to get in touch with you. You can include a contact form, 
            email address, or any other contact information you want to share.
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
