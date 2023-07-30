// HomePage.js
import React from 'react';
import "./home.css"
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
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to Your Project</h2>
            <p>Give a catchy tagline or introduction here.</p>
            <div className=''>
                <button className="button-42" onClick={ () => navigate("/tracker")} >Robot Position</button>
                <br />
                <br />
                <button className="button-42" onClick={ () => navigate("/path-record")} >Path Visualizer</button>
            </div>
          </div>
        </section>

        <section id="tracker" className="project-info">
          <h2>Project Tracker</h2>
          <p>
            Provide a summary of what the project tracker is and how it works. 
            Describe its main features and benefits.
          </p>
          {/* Add any other relevant information about the project */}
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
