import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../page-styles/vexvia/matches.css";

const DivisionNavbar = ({ onDivisionClick, activePage }) => {
    const handlePageChange = (page) => {
      onDivisionClick(page); // Notify the parent component about the clicked page
    };
  
    return (
      <div className="navbar">
        <div
          className={`navbar-item ${activePage === "byRank" ? "active" : ""}`}
          onClick={() => handlePageChange("byRank")}
        >
          By Rank
        </div>
        <div
          className={`navbar-item ${activePage === "byDriver" ? "active" : ""}`}
          onClick={() => handlePageChange("byDriver")}
        >
          By Driver
        </div>
        <div
          className={`navbar-item ${activePage === "byProg" ? "active" : ""}`}
          onClick={() => handlePageChange("byProg")}
        >
          By Prog
        </div>
      </div>
    );
  };
  

const Display = ({ number, ranking, driver, prog, bold, rankFor }) => {
  return (
    <div className="display">
      <div className="display-row">
        <div className="display-item">{number}</div>
        <div className="display-item">Rank By Category: {rankFor}</div>
      </div>
      <div className="display-row">
        <div className="display-item rankings">
          <strong>{ranking}</strong>
        </div>
        <div className="display-item">
          {bold === "total" && (<div><strong>{`Total: ${driver+prog}`}</strong>, {`Driver: ${driver}, Prog: ${prog}`}</div>)}
          {bold === "driver" && (<div>{`Total: ${driver+prog},`} <strong>{`Driver: ${driver}, `}</strong> {`Prog: ${prog}`}</div>)}
          {bold === "prog" && (<div>{`Total: ${driver+prog}, Driver: ${driver}, `} <strong>{`Prog: ${prog}`}</strong></div>)}
        </div>
      </div>
      
    </div>
  );
};

const Skills = () => {
  const { event_id } = useParams();
  const [activeTab, setActiveTab] = useState("byRank"); // Default active tab

  // Use state to store fetched data
  const [rankingsData, setRankingsData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [progData, setProgData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';
  const eventURL = `https://www.robotevents.com/api/v2/events/${event_id}/skills`;

  // Fetch data when active tab changes
  useEffect(() => {
    // Fetch rankings data
    async function fetchData() {
      fetch(`${eventURL}?season[]=197&per_page=250`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.data)
          setRankingsData(data.data);
      
        })
        .catch((error) => {
          console.error("Error fetching rankings data:", error);
        });
    }
    fetchData();
    
  }, []);

  useEffect(() => {
    rankingsData.forEach((team) => {
      if (team.type === "driver") {
      setDriverData((driverData) => [...driverData, team]);
      } else if (team.type === "programming") {
      setProgData((progData) => [...progData, team]);
      }
  });
  }, [rankingsData])



  // console.log(rankingsData)
  // console.log("driverData", driverData)
  // console.log("progData", progData)

  const updateData = () => {
    const newData = []
    for (let i = 0; i < progData.length; i++) {
      newData.push({"id": progData[i].team.id, "name":progData[i].team.name, "rank":progData[i].rank, "driver":driverData[i].score, "prog":progData[i].score})
    }
    return newData
  }

  const sortByDriver = () => {
    let data = updateData()
    const sortedData = data.sort((a, b) => a.driver - b.driver)
    sortedData.reverse()
    for (let i = 0; i < sortedData.length; i++) {
      sortedData[i]["rankFor"] = i+1
    }
    return sortedData
  }
  const sortByProg = () => {
    let data = updateData()
    const sortedData = data.sort((a, b) => a.prog - b.prog)
    sortedData.reverse()
    for (let i = 0; i < sortedData.length; i++) {
      sortedData[i]["rankFor"] = i+1
    }
    return sortedData
  }

  return (
    <div>
      <DivisionNavbar onDivisionClick={handleTabChange} activeTab={activeTab} />

      <div className="conent-center">
        {activeTab === "byRank" && rankingsData && (
          <div className="container">
            <div className="team-container">
                {updateData().map((team) => (
                  <li className="team-container" key={team.id}>
                    <Display
                      number={team.name}
                      ranking={team.rank}
                      driver={team.driver}
                      prog={team.prog}
                      bold={"total"}
                    />
                  </li>
                  ))
                }
            </div>
          </div>
        )}

        {activeTab === "byDriver" && rankingsData && (
          <div className="container">
            <div className="team-container">
                {sortByDriver(driverData).map((team) => (
                  <li className="team-container" key={team.id}>
                    <Display
                      number={team.name}
                      ranking={team.rank}
                      driver={team.driver}
                      prog={team.prog}
                      bold={"driver"}
                      rankFor={team.rankFor}
                    />
                  </li>
                  ))
                }
          </div>
        </div>
        )}

        {activeTab === "byProg" && rankingsData && (
          <div className="container">
            <div className="team-container">
                {sortByProg(driverData).map((team) => (
                  <li className="team-container" key={team.id}>
                    <Display
                      number={team.name}
                      ranking={team.rank}
                      driver={team.driver}
                      prog={team.prog}
                      bold={"prog"}
                      rankFor={team.rankFor}
                    />
                  </li>
                  ))
                }
          </div>
      </div>
        )}

      </div>
    </div>
  );
};

export default Skills;
