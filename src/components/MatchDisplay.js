// MatchDisplay.js
import React from "react";
import "../component-styles/MatchDisplay.css";

const MatchDisplay = ({ matchnum, red1, red2, redscore, blue1, blue2, bluescore, field, time, team }) => {
  const redWins = redscore > bluescore;
  const blueWins = bluescore > redscore;

  const isTeamUnderlined = (player) => team === player;

  return (
    <div className="match-display">
      <div className="match-column">
        <strong>{matchnum}</strong>
      </div>
      <div className={`match-column red-column`}>
        <div className="team-name">
          {isTeamUnderlined(red1) ? <u>{red1}</u> : red1}
          <br />
          {isTeamUnderlined(red2) ? <u>{red2}</u> : red2}
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
            {isTeamUnderlined(bluescore) ? <u>{bluescore}</u> : bluescore}
            {blueWins && <span className="crown">👑</span>}
          </strong>
        </div>
      </div>
      <div className={`match-column blue-column`}>
        <div className="team-name">
          {isTeamUnderlined(blue1) ? <u>{blue1}</u> : blue1}
          <br />
          {isTeamUnderlined(blue2) ? <u>{blue2}</u> : blue2}
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
