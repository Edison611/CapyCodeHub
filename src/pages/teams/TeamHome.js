import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../page-styles/teams/TeamHome.css'
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';


const TeamHome = () => {
  const navigate = useNavigate();

  const { team_id } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  useEffect(() => {
    const apiUrl = `https://www.robotevents.com/api/v2/teams/${team_id}`;

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setTeamData(data);
        setTimeout(10000);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // console.log(teamData)

  useEffect(() => {
    const addInfo = async () => {
      if (teamData) {
        try {
          const docRef = doc(firestore, "teams", teamData.id.toString(), 'info', 'data')
          await setDoc(docRef, {
            team_name: teamData.team_name,
            number: teamData.number,
            id: teamData.id,
            location: teamData.location,
            grade: teamData.grade,
            // program: teamData.program,
            organisation: teamData.organization,
            robot_name: teamData.robot_name
          
        });
        }
      catch (e) {
        console.log("Error adding data: ", e)
      }
      }
    }
      
   addInfo();
   console.log("done adding data")
   setLoading(false);
  }, [teamData])

  useEffect(() => {
    const fetchData = async () => {
      try {
          const teamRef = collection(firestore, "teams", teamData.id.toString(), "info");
          const querySnapshot = await getDocs(
           
              query(teamRef)
            );
          
          // console.log(querySnapshot)
          const info = []
          querySnapshot.forEach((doc) => {
              info.push(doc.data());
          });
          setAllData(info)
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };
    

  fetchData();
  }, [teamData, loading])

  console.log(allData)



  // console.log("TEST")


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  // const address = teamData.location.city + ", " + teamData.location.region + ", " + teamData.location.country

  return (
  <div>
    <div>
       {allData && (
        <div>Team Information: {allData[0].team_name} {allData[0].id}
        </div>)}
    </div>
  </div>

  );
};

export default TeamHome;
