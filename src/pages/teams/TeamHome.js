import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/teams/TeamHome.css'
import { useNavigate } from 'react-router-dom';
import SkillsDisplay from '../../components/SkillsDisplay';
import CompetitionDisplay from '../../components/CompetitionsDisplay';

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

        const skillsInfo = await fetchPageData(team_id + "/skills?season%5B%5D=181&per_page=250");
        setSkillsData(skillsInfo.data);

        const compInfo = await fetchPageData(team_id + "/rankings?season%5B%5D=181&per_page=250");
        setCompData(compInfo.data);

        const matchInfo = await fetchPageData(team_id + "/matches?season%5B%5D=181&per_page=250");
        setMatchData(matchInfo.data);

        const awardsInfo = await fetchPageData(team_id + "/awards?season%5B%5D=181&per_page=250");
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  // const address = teamData.location.city + ", " + teamData.location.region + ", " + teamData.location.country

  return (
  <div>
       {teamData && (
      <div>
        <div className='team-title'>{teamData.team_name} ({teamData.number})</div>
        {teamData && (<div className='team-location'>{teamData.location.city}, {teamData.location.region}, {teamData.location.country}</div>)}
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
          ))}</div>
        </div>)}
  </div>

  );
};

export default TeamHome;
