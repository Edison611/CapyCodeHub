import React, { useEffect, useState } from 'react';
import "../component-styles/ScoutingTeamsDisplay.css";

const ScoutingTeamsDisplay = ({ alliances, opponents }) => {
  const [highestCombinedScore, setHighestCombinedScore] = useState(null);
  const [skillsData, setSkillsData] = useState([]);

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const fetchDataForPage = async (id) => {
      try {
        const response = await fetch(`https://www.robotevents.com/api/v2/teams/${id}/skills?season%5B%5D=190`, {
          headers: {  
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log("done team: ", id);
        setSkillsData((prevData) => [...prevData, ...data.data]);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    };

    const fetchAllData = async () => {
      try {
        await Promise.all(alliances.map((alliance) => fetchDataForPage(alliance.id)));
        console.log("All data fetched");
      } catch (error) {
        // Handle error
        console.error('Error fetching all data:', error);
      }
    };


    const calculateHighestCombinedScore = (skillsData) => {

      const combinedScores = [];

      // Combine scores for alliances and opponents
      const allTeams = [...alliances];
      if (allTeams.length === 0) {
        return
      }

      // allTeams.forEach((team) => {
      //   const teamSkills = skillsData.filter((skill) => skill.team.id === team.id);
      //   const combinedScore = teamSkills.reduce((acc, skill) => acc + skill.score, 0);
      //   combinedScores.push({ team: team.name, score: combinedScore });
      // });

      // // Find the highest combined score
      // const highestScore = Math.max(...combinedScores.map((team) => team.score));
      // const highestScoreTeam = combinedScores.find((team) => team.score === highestScore);

      // setHighestCombinedScore({ team: highestScoreTeam.team, score: highestScore });
    };

    fetchAllData().then(() => {
      //calculateHighestCombinedScore(skillsData);
      console.log("Skills:", skillsData);
      console.log("Scores: ", highestCombinedScore);
    });
  }, []);

  const splitOpponents = () => {
    const column1 = [];
    const column2 = [];

    opponents.forEach((opponent, index) => {
      if (index % 2 === 0) {
        column1.push(opponent);
      } else {
        column2.push(opponent);
      }
    });

    return [column1, column2];
  };

  const [opponentsColumn1, opponentsColumn2] = splitOpponents();
  return (
    <div className='scouting-team-container'>
      <div className='scouting-team-column'>
        <h2>Alliance</h2>
        {alliances && alliances.map((alliance, index) => (
          <div key={index} className='scouting-team-item'>
            {alliance.name}
          </div>
        ))}
      </div>

      <div className='scouting-team-column'>
        <h2>Opponent 1</h2>
        {opponentsColumn1 && opponentsColumn1.map((opponent, index) => (
          <div key={index} className='scouting-team-item'>
            {opponent.name}
          </div>
        ))}
      </div>

      <div className='scouting-team-column'>
        <h2>Opponent 2</h2>
        {opponentsColumn2 && opponentsColumn2.map((opponent, index) => (
          <div key={index} className='scouting-team-item'>
            {opponent.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutingTeamsDisplay;