import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/vexvia/eventHome.css'
import { useNavigate } from 'react-router-dom';

const Display = ( {title} ) => {
  return (
    <div className="display">
      <h2>{title}</h2>
    </div>
  );
};

const EventHome = () => {
  const navigate = useNavigate();

  const { event_id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const apiUrl = `https://www.robotevents.com/api/v2/events?season[]=197&program[]=1&per_page=100`;

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setEventData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [event_id]);

  function goToDivision(id) {
    const path = `/vexvia/comps/${event_id}/division/${id}/matches`
    navigate(path)
  }

  function goToSkills() {
    const path = `/vexvia/comps/${event_id}/skills`
    navigate(path)
  }

  function goToAwards() {
    const path = `/vexvia/comps/${event_id}/awards`
    navigate(path)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  const date = eventData.start.slice(0,10) + " → " + eventData.end.slice(0,10)
  const address = eventData.location.city + ", " + eventData.location.region + ", " + eventData.location.country
  const divisions = eventData.divisions
  // console.log(eventData)

  return (
  <div>
    <div className="event-details-custom-bg">
      {eventData && (
        <div className="event-details">
          <div className="event-title">{eventData.name}</div>
          <div className="event-info">{date}</div>
          <div className="event-info">{address}</div>
          <div className="event-info"><strong>{eventData.level} Event</strong></div>
        </div>
      )}
    </div>
    <div className="event-details-columns">
        <div className="event-details-left">
          <h2>Divisions</h2>
          <hr />
          {divisions && (
            <div>
              {divisions.map(division => (
                <li key={division.id} onClick={() => goToDivision(division.id)}>
                  <Display title={division.name}/> 
                </li>
              ))}
            </div>
          )}
        </div>
        <div className="event-details-right" >
          <h2>Skills Challenges</h2>
          <hr />
          <li onClick={goToSkills}>
          <Display title={"Skills Challenge Rankings"} />
          </li>
        </div>
        
      </div>
      <div className="event-details-bottom">
          <h2>Awards</h2>
              <hr />
              <div onClick={goToAwards}>
              <Display title={"Awards"} />
              </div>
        </div>
  </div>

  );
};

export default EventHome;
