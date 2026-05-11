import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/teams/TeamHome.css'
import { useNavigate } from 'react-router-dom';
import SkillsDisplay from '../../components/SkillsDisplay';
import CompetitionDisplay from '../../components/CompetitionsDisplay'
import LoadingPage from '../../components/Loading';

const TeamHome = () => {
  const navigate = useNavigate();

  const { team_id } = useParams();
  const [teamData, setTeamData] = useState([]);
  const [compData, setCompData] = useState([]); 
  const [matchData, setMatchData] = useState([]);
  const [awardsData, setAwardsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    async function fetchPageData(path) {
      const apiUrl = `https://www.robotevents.com/api/v2/teams/${path}`;
  
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const json = await response.json();
      return json
    }

    async function fetchData() {
      try {
        const teamInfo = await fetchPageData(team_id);
        setTeamData(teamInfo);

        const skillsInfo = await fetchPageData(team_id + "/skills?season%5B%5D=197&per_page=250");
        setSkillsData(skillsInfo.data);

        const compInfo = await fetchPageData(team_id + "/rankings?season%5B%5D=197&per_page=250");
        setCompData(compInfo.data);

        const matchInfo = await fetchPageData(team_id + "/matches?season%5B%5D=197&per_page=250");
        setMatchData(matchInfo.data);

        const awardsInfo = await fetchPageData(team_id + "/awards?season%5B%5D=197&per_page=250");
        setAwardsData(awardsInfo.data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
    
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  // const address = teamData.location.city + ", " + teamData.location.region + ", " + teamData.location.country

  // Calculate stats from matchData using alliance color and scores
  let totalMatches = 0;
  let wins = 0;
  let losses = 0;
  let ties = 0;
  let awp = 0;
  let ap = 0;

  console.log("Comp Data: ", compData);

  // Calculate stats from competition data
  let totalComps = 0;
  let avgAP = 0;
  let avgAWP = 0;

  if (Array.isArray(compData) && compData.length > 0) {
    totalComps = compData.length;
    let totalAP = 0;
    let totalAWP = 0;

    compData.forEach(comp => {
      // Add AP from each competition
      if (typeof comp.ap === "number") {
        totalAP += comp.ap;
      }
      // Calculate AWP using correct formula: wp - (wins * 2) - (ties * 1)
      if (typeof comp.wp === "number" && typeof comp.wins === "number" && typeof comp.ties === "number") {
        const awpValue = comp.wp - (comp.wins * 2) - (comp.ties * 1);
        totalAWP += awpValue;
      }
    });

    // Calculate averages
    avgAP = totalComps > 0 ? (totalAP / totalComps).toFixed(2) : 0;
    avgAWP = totalComps > 0 ? (totalAWP / totalComps).toFixed(2) : 0;
  }

  if (Array.isArray(matchData)) {
    totalMatches = matchData.length;
    matchData.forEach(match => {
      // Find which alliance (blue/red) the team is on
      let teamColor = null;
      if (Array.isArray(match.alliances)) {
        for (const alliance of match.alliances) {
          if (Array.isArray(alliance.teams)) {
            for (const t of alliance.teams) {
              if (t.team && (t.team.name === teamData.number || t.team.id === teamData.id)) {
                teamColor = alliance.color;
              }
            }
          }
        }
      }
      // Get both alliance scores
      let blueScore = null, redScore = null;
      if (Array.isArray(match.alliances)) {
        for (const alliance of match.alliances) {
          if (alliance.color === "blue") blueScore = alliance.score;
          if (alliance.color === "red") redScore = alliance.score;
        }
      }
      // Determine win/loss/tie
      if (teamColor && blueScore !== null && redScore !== null) {
        if (blueScore === redScore) ties++;
        else if (
          (teamColor === "blue" && blueScore > redScore) ||
          (teamColor === "red" && redScore > blueScore)
        ) {
          wins++;
        } else {
          losses++;
        }
      }
      // AWP and AP logic (if available)
      if (match.awp) awp++;
      if (typeof match.ap === "number") ap += match.ap;
    });
  }

  const winPercentage = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : "0.0";
  const awpPercentage = totalMatches > 0 ? ((awp / totalMatches) * 100).toFixed(1) : "0.0";
  const apPercentage = totalMatches > 0 ? ((ap / (totalMatches * 2)) * 100).toFixed(1) : "0.0"; // Assuming max AP per match is 2
  const winLossString = `W: ${wins}  L: ${losses}  T: ${ties}`;

  return (
    <div>
      {teamData && (
        <div>
          <div className='team-title'>{teamData.team_name} ({teamData.number})</div>
          {teamData && (<div className='team-location'>{teamData.location.city}, {teamData.location.region}, {teamData.location.country}</div>)}

          {/* Team Stats Section */}
          <div className="team-stats" style={{margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9'}}>
            <h3>Team Stats</h3>
            <div><b>Total Matches:</b> {totalMatches}</div>
            <div><b>Wins / Losses / Ties:</b> {winLossString}</div>
            <div><b>Win Percentage:</b> {winPercentage}%</div>
            <div><b>Competitions Attended:</b> {totalComps}</div>
            <div><b>Average AP per Event:</b> {avgAP}</div>
            <div><b>Average AWP per Event:</b> {avgAWP}</div>
          </div>

          <div className="subtitle">Competitions:</div>
          <div className="line"></div>
          <div className='competition-data'>
            <CompetitionDisplay competitionData={compData} />
          </div>
          <div className='subtitle'>Skills Data:</div>
          <div className="line"></div>
          <div className='skills-data'>
            <SkillsDisplay skillsData={skillsData} />
          </div>
          <div className='subtitle'>Awards:</div>
          <div className="line"></div>
          <div className='awards-data'>
            {awardsData.map((award, index) => (
              <div key={index} className="award-card">
                <h3>{award.title}</h3>
                <p>Event: {award.event.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamHome;
