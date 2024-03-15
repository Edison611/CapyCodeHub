import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField"
import EventDisplay from '../components/EventDisplay';
import '../page-styles/vexvia.css'
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"
import LoadingPage from '../components/Loading';

function Vexvia() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  var [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access Token (DO NOT CHANGE)
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGJmMTdkZmIxZWRjMmRlZGQ5MjhmM2ZkODEzZDNkNWM1ZjNjOGU3OTUwY2JhYTIzODA5YzIwNzM3OGE4ZmFjZTZiMGIyODdlMjdmODM4NjIiLCJpYXQiOjE2OTE5ODQ4MDMuMDAyNTA3OSwibmJmIjoxNjkxOTg0ODAzLjAwMjUxMSwiZXhwIjoyNjM4NzU5NjAyLjk5NzEyOTksInN1YiI6IjExNzQzOSIsInNjb3BlcyI6W119.opzagy4WRMMhh3LQQhk0Fp-2NGo37AushuMGtU4cS6VwkxhsL-YdEzq18x1ocXLxj_Ip_1J41dL3NaVgCDUkrHZRA2eR-taKXKh7OZo3W-s9PJJjGKb4RyolAIPUWiQzQKdzbbKsvXoqdFAK8zfiEE_jjMIww9eXEEzd_COI2FtIp4BBgR84ss_RsuLWcT9r0OjW810iZTBzep96KwJPQDatq6RXTMIpc04HZcYUJah1l4hAjQlpReER4CKQ7w5IdPXzdOS1He-eToEwpIKTPXKoxnAcnwdOQWiJj3RAXFf9lVM5n9s7K-OdSMTBS3LKDlzxfJHAYQwC0Wpdr4LnMol4LcyZksyVXu-bb-vxxYeYm88ziIsLeCef0l9qHf_D46_jfln2e8cpaK88VBkKQmQO3gI8PB-QY4h0hGWwO3-WLV2vR_8TwwAoaw9Hds02NCKNNRzMI7ShqRyonjcTn5O1t2BwSrwnOVDTUGYf5EFWIjEbGB8B-xuqfCFqtq9u8kzeFqszgAUzdYOomsdjB35U5mWP7shOm4HRUm5I6OEmUTu5NZnRHLP8vZpIdS1_81WT2wCdyB6qxfIn3SuJk44EklLPzN4H6KkVH74j6J5d8CkB--NY74WyQVHapmGo4Dr9siIjg4am6w2nqYjbi3zVGxSk_aBYM5PoMDHnATY';

  // Fetches team data
  useEffect(() => {
    const apiUrl = 'https://www.robotevents.com/api/v2/events';

    function fetchDataForPage(page){

      fetch(`${apiUrl}?page=${page}&per_page=250&season%5B%5D=181&eventTypes%5B%5D=tournament`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setEvents(prevData => [...prevData, ...data.data])
      })
      .catch(error => {
        setError(error);
      });
    }
    const totalPages = 30; // should be 5 for full use

    function fetchAllData() {
      const fetchPromises = [];
      for (let page = 1; page <= totalPages; page++) {
        fetchPromises.push(fetchDataForPage(page));
      }
      Promise.all(fetchPromises)
      setLoading(false);
    }

    fetchAllData();
    

    
  }, [accessToken]);


  const filteredData = (events.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.name.toLowerCase().includes(inputText)
    }
    }))

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  // Calculate the total number of pages based on filtered data
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the data to be displayed on the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handles when the search bar changes
  const handleSearchChange = (e) => {
    setInputText(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset current page when searching
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };
  
  if (loading) {
    return <LoadingPage />;
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  return (
    <div className="main">
      <img src={logo} onClick={ () => navigate("/")} alt="" className='logo2'></img>
      <div className='mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl pt-10'>Events</div>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          label="Search for events"
          value={inputText} // Bind the input value to the state
        />
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
      <div className="page-numbers">
        {Array.from({ length: 3 }, (_, index) => {
            const pageToShow = currentPage + index - 1;
            if (pageToShow >= 1 && pageToShow <= pageCount) {
              return (
                <button
                  key={pageToShow}
                  onClick={() => handlePageChange(pageToShow)}
                  className={currentPage === pageToShow ? "active" : ""}
                >
                  {pageToShow}
                </button>
              );
            } else {
              return null;
          }
        })}
      </div>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount}>
          Next
      </button>
      </div>
      {loading ? (
            <div>LOADING DATA</div>
        ) : (
      <div className='center-align'>
          {paginatedData.map(event => (
            <li key={filteredData.id}>
              <EventDisplay name={event.name} location={event.location.city + ', ' + event.location.country} date={[event.start.slice(0,10), event.end.slice(0, 10)]} id={event.id}  />
              </li>
          ))} 
      </div>
      )}
    </div>
    
  );
}

export default Vexvia;
