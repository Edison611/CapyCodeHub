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
  
  const StatsDisplay = ({ team, data }) => {
    const { event_id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="display">
            <div className="teams-table">
                <div className="column">
                    <div className="num">{team}</div>
                </div>
                <div className="column">
                    <div>OPR: {data.OPR}</div>
                </div>
                <div className="column">
                    <div>DPR: {data.DPR}</div>
                </div>
                <div className="column">
                    <div>CCWM: {data.CCWM}</div>
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

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYjI1YTEzMGE0ZDc2OWFhOWE5NDI0NzA1ZGRlNTA0MDVjYmFjMzBhZjdmOTIxZjJhZjhkMjM5MDNkMzVjMmRlZDgxMzIxYmEzOGUxYWEyNjEiLCJpYXQiOjE3MTY2OTU5NTcuNDU3NDI5OSwibmJmIjoxNzE2Njk1OTU3LjQ1NzQzMywiZXhwIjoyNjYzMzg0MzU3LjQ0NDA5OCwic3ViIjoiMTE3NDM5Iiwic2NvcGVzIjpbXX0.BR79T4-SK9ytb4EKCGLdHVbuXfZ8byvxYW7gJ4PeBlFMLEuo6B4ckSNjz9bGGXWmmGUg4yfIRLmIRlMvX38U5pcEx61sf2NQDHBoB8Os5YvoHM_Uef2VGMhGMrxu5c_S5IGdA0qlIKcJG1u2vbnXBBTCGSpXlUAB95WaDQ99DKVyrBOpq_68uCwzu5vRDkG34hgYOt-zG5f1-sbS6tUr2UbrYsTjhKOGtvta-uCfr740SOdLj-hzhEIeeGtBMN5jhh6i4Ag9WwJtdxDCtcAR7C4b9UaRxweWh3nzXermwkpUEdYpbpgriX2P82BXhI0QayfW6ZRVPOQdj3irm47FODzLJmaOSzNqZ35SLc3iYFUk1UnkNrbFE91ph3kBI68FRvbUDQx1zGEOZYl05tVkw5fAUNgd-AZDu78fiiq92cBr5eKe4mw2JlCLaNPF0YBmFb0WTW4kc6wcVimTHVpMYdG6PEL0UVj_rTkJYXQbRZ2BqXVwtRSdLwD-WcQC3Rbp69Iq60Rv1YZs1mnbPIj4tc1CRttQN_pLTqyH36-sEJQuzhM4-6eNiLlUGuQ4URNztstT4z3nnYFlwZGcm3UeBuD77cEwQoCpCP8hGk_KMUSfkA6Nh1A0V4xTzpIAIJyZi6nt6tmMhfxYofDC1vo5_wwpcKKsil3hF-IHFFGZuRg';
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
    fetch(`${eventURL}divisions/${division_id}/rankings?per_page=250`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
          }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setRankingsData(data.data.reverse());   
      })
      .catch((error) => {
        console.error("Error fetching rankings data:", error);
      });

    const apiUrl = `https://www.robotevents.com/api/v2/teams?number[]=${inputText}&program[]=1&season[]=197&myTeams=false&registered=true`;

    function fetchDataForPage(page) {
      fetch(`${apiUrl}?myTeams=false&page=${page}&per_page=250`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(d => setTeamsData(prevData => [...prevData, ...d.data]))
    }

    const totalPages = 5;

    function fetchAllData() {
      const fetchPromises = [];
      for (let page = 0; page <= totalPages; page++) {
        fetchPromises.push(fetchDataForPage(page));
      }
      Promise.all(fetchPromises)
    }

    fetchAllData();

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
      
  }, [activePage]);

  useEffect(() => {
    // console.log(teamsData)
    // console.log(scheduleData)
    fetch('https://capycodehub-api.vercel.app/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamData : teamsData, matchData : scheduleData}),
      })
        .then(response => response.json())
        .then(jsonData => setStatsData(jsonData))
        .catch(error => console.error('Error:', error));
    }, [teamsData, scheduleData]);

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
  console.log(statsData)
  const [sortBy, setSortBy] = useState(null);
  const sortByCriterion = (criterion) => {
    setSortBy(criterion);
};

const sortedTeams = () => {
    const teamsArray = Object.keys(statsData.OPR).map(team => ({
        team: team,
        data: {
            OPR: statsData.OPR[team],
            DPR: statsData.DPR[team],
            CCWM: statsData.CCWM[team]
        }
    }));

    if (sortBy === 'OPR') {
        return teamsArray.sort((a, b) => b.data.OPR - a.data.OPR)
    } else if (sortBy === 'DPR') {
        return teamsArray.sort((a, b) => b.data.DPR - a.data.DPR);
    } else if (sortBy === 'CCWM') {
        return teamsArray.sort((a, b) => b.data.CCWM - a.data.CCWM);
    } else {
        return(teamsArray)
    } 
};

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
                        <Display number={team.team.name} name={team.team.name} ranking={team.rank} wp={team.wp} ap={team.ap} 
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
                    <li key={team.id*2}>
                        <TeamsDisplay number={team.number} name={team.team_name} location={teamsMap[team.number].location} ranking={teamsMap[team.number].rank} 
                        wp={teamsMap[team.number].wp} ap={teamsMap[team.number].ap} sp={teamsMap[team.number].sp} 
                        wins={teamsMap[team.number].wins} losses={teamsMap[team.number].losses} ties={teamsMap[team.number].ties} id={team.id} />
                    </li>
                ))} 
            </div>
          </div>
        )}
        {activePage === "stats" && teamsData && statsData && (
            // <div>Coming soon</div>
            <div className="team-container">
              <tr>
                  <th className="px-4 py-2 bg-gray-800 text-gray-200" onClick={() => sortByCriterion('team')}>Team</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-200" onClick={() => sortByCriterion('OPR')}>OPR</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-200" onClick={() => sortByCriterion('DPR')}>DPR</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-200" onClick={() => sortByCriterion('CCWM')}>CCWM</th>
              </tr>
                {sortedTeams().map(team => (
                  <div className="team-stats">
                      <StatsDisplay team={team.team} data={{
                          OPR: team.data.OPR,
                          DPR: team.data.DPR,
                          CCWM: team.data.CCWM
                      }}
                      />
                  </div>
              ))}
            </div>
        )}
        
      </div>  
    </div>
  );
};

export default Matches;
