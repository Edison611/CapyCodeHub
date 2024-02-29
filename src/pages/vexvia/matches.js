import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DivisionNavbar from "./DivisionNavbar";
import "../../page-styles/vexvia/matches.css"
import DropdownMenuComponent from "./Dropdown";

const Display = ({ number, name, ranking, wp, ap, sp, wins, losses, ties, id }) => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  // console.log(id)
    return (
      <div className="display" onClick={() => navigate(`/vexvia/teams/${id}/${event_id}`)}>
        <div className="display-row">
          <div className="display-item">{number}</div>
          <div className="display-item">{name}</div>
        </div>
        <div className="display-row">
          <div className="display-item rankings"><strong>{ranking}</strong>{` (${wins}-${losses}-${ties})`}</div>
          <div className="display-item">{`${wp}WPs, ${ap}APs, ${sp}SPs`}</div>
        </div>
      </div>
    );
  };


  const TeamsDisplay = ({ number, name, location, ranking, wins, losses, ties, id, wp, ap, sp }) => {
    const { event_id } = useParams();
    const navigate = useNavigate();
    return (
      <div className="display" onClick={() => navigate(`/vexvia/teams/${id}/${event_id}`)}>
        <div className="teams-table">
          <div className="column">
            <div className="num">{number}</div>
          </div>
          <div className="column">
            <div>{name}</div>
            <div>{location}</div>
          </div>
          <div className="column">
            <div>
              Rank: {ranking} | Win-Loss-Ties: ({wins}-{losses}-{ties})
            </div>
          </div>
        </div>
      </div>
    );
  };
  


const Matches = () => {
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { division_id } = useParams();
  const [activePage, setActivePage] = useState("schedule"); // Default active page

  // Use state to store fetched data
  const [scheduleData, setScheduleData] = useState(null);
  const [rankingsData, setRankingsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  var teamsMap = {};

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';
  const eventURL = `https://www.robotevents.com/api/v2/events/${event_id}/`
  // Fetch data when active page changes
  useEffect(() => {
    // Fetch schedule data
    fetch(`${eventURL}divisions/${division_id}/matches?per_page=250`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
          }
      })
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching schedule data:", error);
      });

    // Fetch rankings data
    fetch(`${eventURL}divisions/${division_id}/rankings?per_page=150`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
          }
    })
      .then((response) => response.json())
      .then((data) => {
        setRankingsData(data.data.reverse());   
      })
      .catch((error) => {
        console.error("Error fetching rankings data:", error);
      });

    // Fetch teams data
    fetch(`${eventURL}teams?per_page=250`, {
      headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setTeamsData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching teams data:", error);
      });
    // fetch("http://localhost:5000/data").then(
    //   res => res.json()
    // ).then(
    //   data => {
    //     setStatsData(data);
    //     console.log(data);
    //   }
    // )
  }, [activePage]);

  if (teamsData.length > 0) {
    teamsData.forEach((team) => {
      teamsMap[team.number] = {
        name: team.team_name,
        location: String(team.location.city) + ", " + String(team.location.region) + ", " + String(team.location.country),         
      };
    });
  }

  // console.log(teamsData)

  if (rankingsData.length > 0) {
    rankingsData.forEach((team) => {
      if (teamsMap[team.team.name]) {
        teamsMap[team.team.name].rank = team.rank;
        teamsMap[team.team.name].wp = team.wp;
        teamsMap[team.team.name].ap = team.ap;
        teamsMap[team.team.name].sp = team.sp;
        teamsMap[team.team.name].wins = team.wins;
        teamsMap[team.team.name].losses = team.losses;
        teamsMap[team.team.name].ties = team.ties;
      }
    })
  }



  return (
    <div>
      <DivisionNavbar onDivisionClick={handlePageChange} activePage={activePage} />

      <div>
        {/* Display fetched data based on the active page */}
        {activePage === "schedule" && scheduleData && (
          <div className="container">
            <DropdownMenuComponent scheduleData={scheduleData} selectedRound={2} level={"Qualification"}/>
            <DropdownMenuComponent scheduleData={scheduleData} selectedRound={6} level={"Round of 16"}/>
            <DropdownMenuComponent scheduleData={scheduleData} selectedRound={3} level={"Quarterfinals"}/>
            <DropdownMenuComponent scheduleData={scheduleData} selectedRound={4} level={"Semifinals"}/>
            <DropdownMenuComponent scheduleData={scheduleData} selectedRound={5} level={"Finals"}/>

          </div>
        )}
        
        {activePage === "rankings" && rankingsData && (
          <div className="container">
            <div className="team-container">
                {rankingsData.map(team => (
                    <li key={team.id}>
                        <Display number={team.team.name} name={teamsMap[team.team.name].name} ranking={team.rank} wp={team.wp} ap={team.ap} 
                        sp={team.sp} wins={team.wins} losses={team.losses} ties={team.ties} id={team.team.id} />
                    </li>
                ))} 
            </div>
          </div>
        )}
        
        {activePage === "teams" && teamsData && (
          <div className="team-container">
            <div className="team-container">
                {teamsData.map(team => (
                    <li key={team.id}>
                        <TeamsDisplay number={team.number} name={team.team_name} location={teamsMap[team.number].location} ranking={teamsMap[team.number].rank} 
                        wp={teamsMap[team.number].wp} ap={teamsMap[team.number].ap} sp={teamsMap[team.number].sp} 
                        wins={teamsMap[team.number].wins} losses={teamsMap[team.number].losses} ties={teamsMap[team.number].ties} id={team.id} />
                    </li>
                ))} 
            </div>
          </div>
        )}

        {activePage === "stats" && teamsData && (
          <div className="team-container">
            COMING SOON!!!
            {statsData}
            <div className="team-container">

            </div>
          </div>
        )}
      </div>  
    </div>
  );
};

export default Matches;
