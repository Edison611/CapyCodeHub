import React, { useState } from 'react';
import '../../page-styles/vexvia/Dropdown.css'

const MatchDisplay = ({ matchnum, red1, red2, redscore, blue1, blue2, bluescore, field, time }) => {
  const redWins = redscore > bluescore;
  const blueWins = bluescore > redscore;

  return (
    <div className="match-display">
      <div className="match-column">
        <strong>{matchnum}</strong>
      </div>
      <div className={`match-column red-column`}>
        <div className="team-name">
          {red1}
          <br />
          {red2}
        </div>
      </div>
      <div className={`match-column red-column ${redWins ? 'winner' : ''}`}>
        <div className="score-container">
          <strong>
          {redWins && <span className="crown">👑</span>}
          {redscore}
          </strong>
        </div>
      </div>
      <div className='match-column'>
        <div>{field}</div>
        <div>{time}</div>
      </div>
      <div className={`match-column blue-column ${blueWins ? 'winner' : ''}`}>
        <div className="score-container">
          <strong>
          {bluescore}
          {blueWins && <span className="crown">👑</span>}
          </strong>
        </div>
      </div>
      <div className={`match-column blue-column`}>
        <div className="team-name">
          {blue1}
          <br />
          {blue2}
        </div>
      </div>
    </div>
  );
};


const ScheduleDisplay = ({ data }) => {
  console.log(data)

  return (
    <div className='box'>
      <ul>
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
      </ul>
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

