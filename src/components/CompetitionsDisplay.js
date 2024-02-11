import React from 'react';
import '../component-styles/CompetitionsDisplay.css'; // Import CSS file for styling
import { useNavigate, useParams } from 'react-router-dom';

const CompetitionDisplay = ({ competitionData }) => {
  const navigate = useNavigate();
  const { team_id } = useParams();
  const splitIndex = Math.ceil(competitionData.length / 2);
  const leftColumnData = competitionData.slice(0, splitIndex);
  const rightColumnData = competitionData.slice(splitIndex);

  const handleCardClick = (competitionId) => {
    navigate(`/vexvia/teams/${team_id}/${competitionId}`); // Replace `/vexvia` with your desired path
  };

  return (
    <div className="competition-container">
      <div className="column">
        {leftColumnData.map(competition => (
          <div key={competition.id} className="competition-card" onClick={() => handleCardClick(competition.event.id)}>
            <h3>Event: {competition.event.name}</h3>
            <p>Division: {competition.division.name}</p>
            <p>Overall Rank: {competition.rank}</p>
            <p>Record: {competition.wins}-{competition.losses}-{competition.ties}</p>
            <p>{competition.wp} WPs, {competition.wp-2*competition.wins-1*competition.ties} AWPs, {competition.ap} APs, {competition.sp} SPs</p>
            <p>High Score: {competition.high_score}</p>
            <p>Average Points: {competition.average_points}</p>
            <p>Total Points: {competition.total_points}</p>
          </div>
        ))}
      </div>
      <div className="column">
        {rightColumnData.map(competition => (
          <div key={competition.id} className="competition-card" onClick={() => handleCardClick(competition.event.id)}>
            <h3>Event: {competition.event.name}</h3>
            <p>Division: {competition.division.name}</p>
            <p>Overall Rank: {competition.rank}</p>
            <p>Record: {competition.wins}-{competition.losses}-{competition.ties}</p>
            <p>{competition.wp} WPs, {competition.wp-2*competition.wins-1*competition.ties} AWPs, {competition.ap} APs, {competition.sp} SPs</p>
            <p>High Score: {competition.high_score}</p>
            <p>Average Points: {competition.average_points}</p>
            <p>Total Points: {competition.total_points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionDisplay;
