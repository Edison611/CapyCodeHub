import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Individual Team Component
const TeamItem = ({ team }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      // Perform redirection here
      // Example: navigate(`/team/${team.number}`);
      navigate(`/vexvia/teams/${team.id}`)
    };
  
    return (
      <li className="cursor-pointer border border-gray-300 px-4 py-2 h-12 flex items-center justify-center" onClick={handleClick}>
        {team.number}
      </li>
    );
};
  
// TeamColumn Component
const TeamColumn = ({ teams }) => {
    return (
      <td className="border border-gray-300 px-4 py-2">
        <ul className="list-none p-0 m-0">
          {teams.map((team, index) => (
            <TeamItem key={index} team={team} />
          ))}
        </ul>
      </td>
    );
};
  

const DivisionPredictor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const divisions = 10;

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const apiUrl = 'https://www.robotevents.com/api/v2/events/53690/teams/';

    function fetchDataForPage(page) {
      fetch(`${apiUrl}?myTeams=false&page=${page}&per_page=250`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(d => setData(prevData => [...prevData, ...d.data]))
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }

    const totalPages = 5;

    function fetchAllData() {
      const fetchPromises = [];
      for (let page = 1; page <= totalPages; page++) {
        fetchPromises.push(fetchDataForPage(page));
      }
      Promise.all(fetchPromises)
      .then(() => setLoading(false));
    }

    fetchAllData();
  }, [accessToken]);

  const sortByMixedString = (array, propertyName) => {
    return array.sort((a, b) => {
      const stringA = a[propertyName];
      const stringB = b[propertyName];
  
      const numA = parseInt(stringA.match(/\d+/)[0], 10);
      const numB = parseInt(stringB.match(/\d+/)[0], 10);
      const alphaA = stringA.replace(/\d+/g, '');
      const alphaB = stringB.replace(/\d+/g, '');
  
      if (numA !== numB) {
        return numA - numB;
      }
  
      return alphaA.localeCompare(alphaB);
    });
  };

  const renderTeamColumns = () => {
    let teamsByDivision = Array.from({ length: divisions }, () => []);
    const sorted = sortByMixedString(data, 'number');

    sorted.forEach((item, index) => {
      const divisionIndex = index % divisions;
      teamsByDivision[divisionIndex].push(item);
    });
    const current = sorted.length % divisions;

    for (let i = current; i < divisions; i++) {
        teamsByDivision[i].push({number: ''});
    }
    console.log(teamsByDivision)

    return teamsByDivision.map((teams, index) => (
        <TeamColumn key={index} teams={teams} />
      ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="border border-gray-300 px-4 py-2 text-4xl" colSpan={divisions}>Worlds Division Predictor</th>
            </tr>
            <tr>
                <th className="border border-gray-300 px-4 py-2" colSpan={divisions}> Updates Live in Real Time (Click on a team to view more info!)</th>
            </tr>
            <tr className="bg-gray-200">
              {Array.from({ length: divisions }, (_, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">Division {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>{renderTeamColumns()}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DivisionPredictor;
