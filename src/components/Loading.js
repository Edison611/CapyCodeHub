import React from 'react';
import '../component-styles/Loading.css'; // Import your CSS file for styling

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
