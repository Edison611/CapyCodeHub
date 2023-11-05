import React from 'react';
import '../component-styles/HeroLink.css';
import { useNavigate } from 'react-router-dom';

function HeroLink({ image, title, text, buttons }) {
  const navigate = useNavigate();

  return (
    <div className="hero-bg">
      <div className="background">
        <img src={image} alt="" className="background-image" />
        <div className="herolink-content">
          <div className="title">{title}</div>
          <div className="text">{text}</div>
          <div className="button-container">
            {buttons.map((item) => (
              <button
                className="button-62"
                onClick={() => navigate(item.link)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroLink;
