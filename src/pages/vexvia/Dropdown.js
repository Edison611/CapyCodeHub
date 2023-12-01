import React, { useState } from 'react';
import '../../page-styles/vexvia/Dropdown.css'
import MatchDisplay from '../../components/MatchDisplay';


const ScheduleDisplay = ({ data }) => {
  return (
    <div className='box'>
      <div className='match-container'>
        {data.map((match) => (
            <MatchDisplay 
                key={match.matchnum}
                matchnum={match.name}
                red1={match.alliances[1].teams[0].team.name}
                red2={match.alliances[1].teams[1].team.name}
                redscore={match.alliances[1].score}
                blue1={match.alliances[0].teams[0].team.name}
                blue2={match.alliances[0].teams[1].team.name}
                bluescore={match.alliances[0].score}
                field={match.field}
                time={match.name[0] === 'Q' && match.name[1] === "u" ? match.scheduled.slice(11, 16): ""}
            />
        ))}
      </div>
    </div>
  );
};




const DropdownMenuComponent = ({ scheduleData, selectedRound, level }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const filteredData = scheduleData.filter((item) => item.round === selectedRound);

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
      <button className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {level}
          <span className="arrow-icon">{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <ScheduleDisplay data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default DropdownMenuComponent;

