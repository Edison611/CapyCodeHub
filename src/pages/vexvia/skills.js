import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SkillsPage() {
  const [skillsData, setSkillsData] = useState([]);
  const {event_id} = useParams(); // Assuming you use React Router for routing

  useEffect(() => {
    // Function to fetch data from the URL using an access token
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.robotevents.com/api/v2/events/${event_id}/skills`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY', // Replace with your access token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSkillsData(data.data);

          // Once data is fetched, post it to CockroachDB
          postSkillsToDatabase(data.data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Make sure to add any dependencies if needed

  const postSkillsToDatabase = async (data) => {
    try {
      // Send a POST request to your Express.js server with the data
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id }), // Assuming "skills" is the key for the skills data
      });

      console.log(data)
      

      if (response.ok) {
        console.log('Skills posted to CockroachDB successfully');
      } else {
        console.error('Error posting skills to CockroachDB:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting skills to CockroachDB:', error);
    }
  };

  console.log(skillsData)

  return (
    <div>
      <h2>Skills</h2>
      {/* Display skillsData in your component */}
    </div>
  );
}

export default SkillsPage;
