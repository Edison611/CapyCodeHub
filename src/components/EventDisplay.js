import React from 'react';
import '../component-styles/EventDisplay.css'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventDisplay = ({ name, location, date, id }) => {

  const navigate = useNavigate()


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access Token (DO NOT CHANGE)
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  function handleClick() {
    setLoading(true)
    const apiUrl = 'https://www.robotevents.com/api/v2/events/'
    fetch(`${apiUrl}${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const eventDetailsPath = `/vexvia/comps/${id}`
      navigate(eventDetailsPath)
      setLoading(false)

    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }

  

  if (error) {
    <div>An Error Has Occured, Please Refresh The Page.</div>
  }
  return (
    <div className="event-display" onClick={handleClick}>
      <div className="event-info">
        <div className="event-name">{name}</div>
        <div className="event-location">{location}</div>
        <div className="event-date">Start: {date[0]}, End: {date[1]}</div>
      </div>
    </div>
  );
};

export default EventDisplay;
