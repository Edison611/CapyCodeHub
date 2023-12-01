import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/teams/TeamHome.css'
import { useNavigate } from 'react-router-dom';
import MatchDisplay from '../../components/MatchDisplay';
import { firestore } from '../../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';

const TeamCompetition = () => {

  const { event_id } = useParams();
  const { team_id } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [teamData, setTeamData] = useState(null); 
  const [skillsData, setSkillsData] = useState(null);
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
      let alliances = {}
      let opponents = {}
      for (let i = 0; i < matchData.length; i++) {
        const match = matchData[i];

        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            if (match.alliances[j].teams[k].team.id === parseInt(team_id)) {
              if (j === 0) {
                opponents[match.alliances[1].teams[0].team.id] = (match.alliances[1].teams[0].team.name)
                opponents[match.alliances[1].teams[1].team.id] = (match.alliances[1].teams[1].team.name)
              }
              else if (j === 1) {
                opponents[match.alliances[0].teams[0].team.id] = (match.alliances[0].teams[0].team.name)
                opponents[match.alliances[0].teams[1].team.id] = (match.alliances[0].teams[1].team.name)
              }
              if (k === 0) {
                alliances[match.alliances[j].teams[k+1].team.id] = (match.alliances[j].teams[k+1].team.name)
              }
              else if (k === 1) {
                alliances[match.alliances[j].teams[k-1].team.id] = (match.alliances[j].teams[k-1].team.name)
              }
            }
            all.push(match.alliances[j].teams[k].team.name)
            all_id.push(match.alliances[j].teams[k].team.id)
          }
        }
      }

      console.log(all)
      console.log(alliances)
      console.log(opponents)

      let filter = ""
      for (let i = 0; i < all_id.length; i++) {
        filter += `team%5B%5D=${all_id[i]}&`
      }
      console.log(filter)
      
      // const apiUrl = `https://www.robotevents.com/api/v2/events/${event_id}/divisions/1/matches?${filter}`;
      
    }
    
  }, [matchData])


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>An error occurred: {error.message}</div>;
  // }
  console.log(matchData)
  console.log(skillsData)

  return (
  <div>
    {teamData && <h1>{teamData.team_name} {team_id} {event_id}</h1>}
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
                team=""
            />
        ))}
      </div>
  </div>

  );
};

export default TeamCompetition;
