import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/teams/TeamHome.css'
import { useNavigate } from 'react-router-dom';
import MatchDisplay from '../../components/MatchDisplay';
import { firestore } from '../../firebase';
import ScoutingTeamsDisplay from '../../components/ScoutingTeamsDisplay';
import { getDocs, query, collection, where } from 'firebase/firestore';

const TeamCompetition = () => {

  const { event_id } = useParams();
  const { team_id } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [teamData, setTeamData] = useState(null); 
  const [skillsData, setSkillsData] = useState(null);
  const [watchData, setWatchData] = useState(null); 
  const [alliances, setAlliances] = useState(null);
  const [opponents, setOpponents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const apiUrl = `https://www.robotevents.com/api/v2/teams/${team_id}/matches?event%5B%5D=${event_id}`;

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setMatchData(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });


      fetch(`https://www.robotevents.com/api/v2/teams/${team_id}/skills?event%5B%5D=${event_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setSkillsData(data.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });


      const fetchTeam = async () => {
        const teamsRef = collection(firestore, "teams");
        
        const querySnapshot = await getDocs(
            query(teamsRef, where("id", "==", parseInt(team_id)))
          );
        
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data())
            setTeamData(doc.data());
        });
        setLoading(false);
      }
      fetchTeam();


  }, []);

  useEffect(() => {
    if (matchData) {
      let all = []
      let all_id = []
      let alliances = []
      let opponents = []
      for (let i = 0; i < matchData.length; i++) {
        const match = matchData[i];

        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            if (match.alliances[j].teams[k].team.id === parseInt(team_id)) {
              if (j === 0) {
                opponents.push({ "id" : match.alliances[1].teams[0].team.id, "name" : match.alliances[1].teams[0].team.name, "matchnum" : match.matchnum})
                opponents.push({ "id" : match.alliances[1].teams[1].team.id, "name" : match.alliances[1].teams[1].team.name, "matchnum" : match.matchnum})
              }
              else if (j === 1) {
                opponents.push({ "id" : match.alliances[0].teams[0].team.id, "name" : match.alliances[0].teams[0].team.name, "matchnum" : match.matchnum})
                opponents.push({ "id" : match.alliances[0].teams[1].team.id, "name" : match.alliances[0].teams[1].team.name, "matchnum" : match.matchnum})
               
              }
              if (k === 0) {
                alliances.push({"id" : match.alliances[j].teams[k+1].team.id, "name" :  match.alliances[j].teams[k+1].team.name, "matchnum" : match.matchnum})
              }
              else if (k === 1) {
                alliances.push({"id" : match.alliances[j].teams[k-1].team.id, "name" :  match.alliances[j].teams[k-1].team.name, "matchnum" : match.matchnum})
              }
            }
            all.push(match.alliances[j].teams[k].team.name)
            all_id.push(match.alliances[j].teams[k].team.id)
          }
        }
      }
      setAlliances(alliances)
      setOpponents(opponents)
      console.log(opponents)

      let filter = ""
      for (let i = 0; i < all_id.length; i++) {
        filter += `team%5B%5D=${all_id[i]}&`
      }
      
      const apiUrl = `https://www.robotevents.com/api/v2/events/${event_id}/divisions/1/matches?${filter}per_page=300`;

      fetch(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          let unique = [];
          let ids = [];
          data.data.forEach((match) => {
            if (ids.includes(match.id)) {
              return;
            }
            
            unique.push(match);
            ids.push(match.id)
      
          })
          const filteredUnique = unique.filter((match) => {
            let opFlag = false
            for (const opponent of opponents) {
              if (opponent.id === match.alliances[0].teams[0].team.id && opponent.matchnum > match.matchnum) {
                // console.log(match.matchnum)
                opFlag = true;
              }
              if (opponent.id === match.alliances[0].teams[1].team.id && opponent.matchnum > match.matchnum) {
                opFlag = true;
              }
              if (opponent.id === match.alliances[1].teams[0].team.id && opponent.matchnum > match.matchnum) {
                opFlag = true;
              }
              if (opponent.id === match.alliances[1].teams[1].team.id && opponent.matchnum > match.matchnum) {
                opFlag = true;
              }
            }

            let alFlag = false

            for (const opponent of alliances) {
              if (opponent.id === match.alliances[0].teams[0].team.id && opponent.matchnum > match.matchnum) {
                console.log(match.matchnum)
                alFlag = true
              }
              if (opponent.id === match.alliances[0].teams[1].team.id && opponent.matchnum > match.matchnum) {
                alFlag = true
              }
              if (opponent.id === match.alliances[1].teams[0].team.id && opponent.matchnum > match.matchnum) {
                alFlag = true
              }
              if (opponent.id === match.alliances[1].teams[1].team.id && opponent.matchnum > match.matchnum) {
                alFlag = true
              }
            }

            if (opFlag || alFlag) {
              return true;
            }
          });

          setWatchData(filteredUnique);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
    
  }, [matchData])

  console.log(watchData)
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>An error occurred: {error.message}</div>;
  // }
  // console.log(matchData)
  // console.log(skillsData)
  // console.log("watchData:", watchData)
  // console.log("alliances", alliances)

  return (
  <div>
    {teamData && <div className='team-title'>{teamData.team_name} ({teamData.number})</div>}
    <div className='match-container'>
        {matchData && matchData.map((match) => (
            <MatchDisplay 
                key={match.id}
                matchnum={match.name}
                red1={match.alliances[1].teams[0].team.name}
                red2={match.alliances[1].teams[1].team.name}
                redscore={match.alliances[1].score}
                blue1={match.alliances[0].teams[0].team.name}
                blue2={match.alliances[0].teams[1].team.name}
                bluescore={match.alliances[0].score}
                field={match.field}
                time={match.name[0] === 'Q' && match.name[1] === "u" ? match.scheduled.slice(11, 16): ""}
                // team={teamData.number}
            />
        ))}
      </div>
    {alliances && opponents && <ScoutingTeamsDisplay alliances={alliances} opponents={opponents} />}
    <div className='team-title'>Games to Watch:</div>
    <div className='match-container'>
        {watchData && watchData.map((match) => (
            <MatchDisplay 
                // key={match.id}
                matchnum={match.name}
                red1={match.alliances[1].teams[0].team.name}
                red2={match.alliances[1].teams[1].team.name}
                redscore={match.alliances[1].score}
                blue1={match.alliances[0].teams[0].team.name}
                blue2={match.alliances[0].teams[1].team.name}
                bluescore={match.alliances[0].score}
                field={match.field}
                time={match.name[0] === 'Q' && match.name[1] === "u" ? match.scheduled.slice(11, 16): ""}
                // team={teamData.number}
                alliances={alliances}
                opponents={opponents}
            />
        ))}
      </div>
  </div>

  );
};

export default TeamCompetition;
