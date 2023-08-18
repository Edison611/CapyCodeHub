import React from 'react';
import '../component-styles/TeamDisplay.css'; 
import Overlay from './Overlay';
import { useState, useEffect } from 'react';

const TeamDisplay = ({ number, name, id }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  // 139521

  var [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access Token (DO NOT CHANGE)
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  function handleClick() {
    setLoading(true)
    if (overlayOpen === true) {
      return
    }
    console.log(id)
    setOverlayOpen(!overlayOpen)
    const apiUrl = 'https://www.robotevents.com/api/v2/teams/';
    console.log(skills)
    fetch(`${apiUrl}${id}/skills?season%5B%5D=181`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("DATA")
      console.log(data)
      setSkills(data.data)
      setLoading(false)
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }

  console.log(skills)
  return (
    <div className="team-display" onClick={handleClick}>
      <div className="team-info">
        <div className="team-name">{number} || {name}</div>
      </div>
      <br></br>
      <Overlay isOpen={overlayOpen} onClose={()=>setOverlayOpen(!overlayOpen) }>
        <div className="header">{number} || {name}</div>
        {loading ? (
          <div>LOADING</div>
          ) : (
            <>
            {skills && skills.length > 0 ? (
              <ul> 
                {skills.map(attempt => (
                  <li key={id+1}>Event: {attempt.event.name}, {attempt.score}, {attempt.type}</li>
              ))}
              </ul>
              ) : (
              <div>NO DATA FOUND</div>
            )}
            </>)
        }
      </Overlay>
    </div>
  );
};

export default TeamDisplay;
