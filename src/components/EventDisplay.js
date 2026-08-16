import React from 'react';
import '../component-styles/EventDisplay.css'; 
import { useNavigate } from 'react-router-dom';

const EventDisplay = ({ name, location, date, id }) => {

  const navigate = useNavigate()

  // The event data is already loaded by the parent page, so no API call is
  // needed here — just navigate to the event page.
  function handleClick() {
    navigate(`/vexvia/comps/${id}`)
  }

  return (
    <div className="event-display" onClick={handleClick}>
      <div className="event-info">
        <div className="event-name">{name}</div>
        <div className="event-location">{location}</div>
        <div className="event-date">Start: {date[0]}, End: {date[1]}</div>
      </div>
    </div>
  );
};

export default EventDisplay;
