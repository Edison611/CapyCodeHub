import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField"
import EventDisplay from '../components/EventDisplay';
import '../page-styles/vexvia.css'
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"
import LoadingPage from '../components/Loading';
import { useSeason } from '../context/SeasonContext';
import SeasonSelector from '../components/SeasonSelector';

function Vexvia() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const { season } = useSeason();

  var [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetches event data from the static JSON file
  useEffect(() => {
    setEvents([]);
    setLoading(true);

    fetch(`/static/eventData_${season}.json`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setEvents(Object.values(data));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [season]);


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
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.75rem 0' }}>
        <SeasonSelector />
      </div>
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
