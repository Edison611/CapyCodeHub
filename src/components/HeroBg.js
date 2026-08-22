import React from 'react';
import SplineBackdrop from './SplineBackdrop';
import LocalDiscBackdrop from './LocalDiscBackdrop';
import logo from '../images/logo.png';
import '../component-styles/HeroBg.css'

function Hero( {image, title, scene} ) {
  return (
    <div className="hero">
      <div className="background">
        <img src={image} alt=""/>
        {/* Optional ambient 3D layer, sandwiched between the image and the title. */}
        <SplineBackdrop scene={scene} />
        {/* Local, dependency-free 3D layer (no hosted scene needed) — a subtle
            spinning disc tucked into the opposite corner from the Spline model. */}
        <LocalDiscBackdrop />
        <div className="hero-content">
          <img src={logo} alt="Team 2055 Capybaras logo" className="hero-badge" />
          <div className='title'>{title}</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
