// MatchDisplay.js
import React from "react";
import "../component-styles/MatchDisplay.css";

const MatchDisplay = ({ matchnum, red1, red2, redscore, blue1, blue2, bluescore, field, time, team, alliances=[], opponents=[] }) => {
  const redWins = redscore > bluescore;
  const blueWins = bluescore > redscore;

  const isTeamUnderlined = (player) => team === player;
  const isTeamInAlliance = (player) => alliances.some(alliance => alliance.name === player);
  const isTeamInOpponents = (player) => opponents.some(opponent => opponent.name === player);


  return (
    <div className="match-display">
      <div className="match-column">
        <strong>{matchnum}</strong>
      </div>
      <div className={`match-column red-column`}>
        <div className="team-name">
          {isTeamUnderlined(red1) ? <u>{red1}</u> : red1}
          {isTeamInAlliance(red1) && <span>💚</span>}
          {isTeamInOpponents(red1) && <span>🆘</span>}
        </div>
        <div className="team-name">
          {isTeamUnderlined(red2) ? <u>{red2}</u> : red2}
          {isTeamInAlliance(red2) && <span>💚</span>}
          {isTeamInOpponents(red2) && <span>🆘</span>}
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
            {isTeamUnderlined(bluescore) ? {bluescore} : bluescore}
            {blueWins && <span className="crown">👑</span>}
          </strong>
        </div>
      </div>
      <div className={`match-column blue-column`}>
        <div className="team-name">
          {isTeamUnderlined(blue1) ? <u>{blue1}</u> : blue1}
          {isTeamInAlliance(blue1) && <span>💚</span>}
          {isTeamInOpponents(blue1) && <span>🆘</span>}
        </div>
        <div className="team-name">
          {isTeamUnderlined(blue2) ? <u>{blue2}</u> : blue2}
          {isTeamInAlliance(blue2) && <span>💚</span>}
          {isTeamInOpponents(blue2) && <span>🆘</span>}
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
