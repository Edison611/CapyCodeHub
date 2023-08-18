import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField"
import TeamDisplay from '../components/TeamDisplay';
import '../page-styles/scouting.css'

function Scouting() {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  var [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access Token (DO NOT CHANGE)
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const apiUrl = 'https://www.robotevents.com/api/v2/teams';

    function fetchDataForPage(page){

      fetch(`${apiUrl}?page=${page}&per_page=250&registered=true&program%5B%5D=1&grade%5B%5D=High%20School`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTeams(prevData => [...prevData, ...data.data])
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }

    const totalPages = 12; // should be 12 for full use

    function fetchAllData() {
      const fetchPromises = [];
      for (let page = 1; page <= totalPages; page++) {
        fetchPromises.push(fetchDataForPage(page));
      }
      Promise.all(fetchPromises)
        .then(() => {
          // console.log('All data retrieved:', teams);
          setLoading(false);
        });
    }

    fetchAllData();

    
  }, [accessToken]);

  const filteredData = (teams.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.number.toLowerCase().includes(inputText)
    }
    }))

  // console.log(teams)
  // console.log(filteredData)


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // console.log("Teams")
  // console.log(teams)

  
  return (
    <div className="main">
      <h1>Scouting Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search for teams"
        />
      </div>
      <ul>
        {filteredData.map(team => (
          <li key={filteredData.id}>
            <TeamDisplay number={team.number} name={team.team_name} id={team.id}/>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Scouting;
