import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField"
import TeamDisplay from '../components/TeamDisplay';
import '../page-styles/scouting.css'
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"
import LoadingPage from '../components/Loading';

function Scouting() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  var [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  // Access Token (DO NOT CHANGE)
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  // Fetches team data
  
  // Handles when the search bar changes
  const handleSearchChange = (e) => {
    setInputText(e.target.value);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const apiUrl = `https://www.robotevents.com/api/v2/teams?number%5B%5D=${inputText}&program%5B%5D=1&myTeams=false&registered=true`;

    try {
      fetch(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        navigate(`/vexvia/teams/${data.data[0].id}`)
      })
      .catch(error => {
        setError("Please Enter a Valid Team Number");
      });
    }
    
    catch (error) {
      setError("Please Enter a Valid Team Number");
    }
    }
  }

  
  return (
    <div className="main">
      
      <img src={logo} onClick={ () => navigate("/")} alt="" className='logo2'></img>
      <h1>Scouting Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          variant="outlined"
          fullWidth
          label="Search for teams"
          value={inputText} // Bind the input value to the state
        />
      </div>
      Press Enter to Search
      <br></br>
      {error}
    </div>
    
  );
}

export default Scouting;
