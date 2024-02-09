import React from 'react';
import '../component-styles/SkillsDisplay.css'; // Import CSS file for styling

const SkillsDisplay = ({ skillsData }) => {
  // Function to combine driver and programming skills at the same event
  const combineSkills = (skills) => {
    const combinedSkills = {};
    skills.forEach(skill => {
      const eventId = skill.event.id;
      const type = skill.type;
      if (!combinedSkills[eventId]) {
        combinedSkills[eventId] = { id: eventId, event: skill.event, team: skill.team, rank: skill.rank, driver: 0, programming: 0};
      }
      if (type === 'driver') {
        combinedSkills[eventId].driver = skill.score;
      } else if (type === 'programming') {
        combinedSkills[eventId].programming = skill.score;
      }
    });
    return Object.values(combinedSkills);
  };

  // Combine skills data
  const combinedSkillsData = combineSkills(skillsData);

  // Sort combined skills data by total score in descending order
  combinedSkillsData.sort((a, b) => {
    const totalScoreA = (a.driver || 0) + (a.programming || 0);
    const totalScoreB = (b.driver || 0) + (b.programming || 0);
    return totalScoreB - totalScoreA;
  });

  return (
    <div className="skills-container">
      <div className="skill-column">
        {combinedSkillsData.map((combinedSkill, index) => index % 2 === 0 && (
          <div key={combinedSkill.id} className="skill-card">
            <h3>Event: {combinedSkill.event.name}</h3>
            <p className="rank">Overall Rank: {combinedSkill.rank}</p>
            <div className="score-details">
                <div className="driver-score">
                  <p>Driver Score: {combinedSkill.driver}</p>
                </div>
                <div className="programming-score">
                  <p>Programming Score: {combinedSkill.programming}</p>
                </div>
            </div>
            <p className="total-score">Total Score: {combinedSkill.driver + combinedSkill.programming}</p>
          </div>
        ))}
      </div>
      <div className="skill-column">
        {combinedSkillsData.map((combinedSkill, index) => index % 2 !== 0 && (
          <div key={combinedSkill.id} className="skill-card">
            <h3>Event: {combinedSkill.event.name}</h3>
            <p className="rank">Overall Rank: {combinedSkill.rank}</p>
            <div className="score-details">
              {combinedSkill.driver && (
                <div className="driver-score">
                  <p>Driver Score: {combinedSkill.driver}</p>
                </div>
              )}
              {combinedSkill.programming && (
                <div className="programming-score">
                  <p>Programming Score: {combinedSkill.programming}</p>
                </div>
              )}
            </div>
            <p className="total-score">Total Score: {combinedSkill.driver + combinedSkill.programming}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay;
