import React from 'react';
import '../../page-styles/vexvia/DivisionNavbar.css'; // Corrected path to your CSS file

const DivisionNavbar = ({ onDivisionClick, activePage }) => {
  const handlePageChange = (page) => {
    onDivisionClick(page); // Notify the parent component about the clicked page
  };

  return (
    <div className="navbar">
      <div
        className={`navbar-item ${activePage === "schedule" ? "active" : ""}`}
        onClick={() => handlePageChange("schedule")}
      >
        Schedule
      </div>
      <div
        className={`navbar-item ${activePage === "rankings" ? "active" : ""}`}
        onClick={() => handlePageChange("rankings")}
      >
        Rankings
      </div>
      <div
        className={`navbar-item ${activePage === "teams" ? "active" : ""}`}
        onClick={() => handlePageChange("teams")}
      >
        Teams
      </div>
      <div
        className={`navbar-item ${activePage === "stats" ? "active" : ""}`}
        onClick={() => handlePageChange("stats")}
      >
        Stats
      </div>
    </div>
  );
};

export default DivisionNavbar;
