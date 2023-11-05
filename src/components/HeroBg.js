import React from 'react';
import '../component-styles/HeroBg.css'

function Hero( {image, title} ) {
  return (
    <div className="hero">
      <div className="background">
        <img src={image} alt=""/>
        <div className="hero-content">
          <div className='title'>{title}</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;