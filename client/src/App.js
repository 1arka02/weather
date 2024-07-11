import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Location from './Location';
import Hourly from './Hours';
import DailyForecast from './DailyForecast';
import Navbar from './navbar';
import SavedLocations from './SavedLocations';
import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ip, setIp] = useState('');
  const [forecastData, setForecastData] = useState({});
  const [savedLocations, setSavedLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [username, setUsername] = useState('');
  const [newUser, setNewUser] = useState('');
  const [enteringUsername, setEnteringUsername] = useState(false); // Track entering username state

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip;
        setIp(ip);

        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c7829ba6854f44a1b60165127242806&q=${ip}`);
        const forecastResponse = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=c7829ba6854f44a1b60165127242806&q=${ip}&days=7`);

        setData(weatherResponse.data);
        setForecastData(forecastResponse.data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching location or weather data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchLocationAndWeather();
  }, []);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await axios.get('http://localhost:2000/users');
        setSavedLocations(response.data);
      } catch (error) {
        console.error('Error fetching saved locations', error);
      }
    };

    fetchSavedLocations();
  }, []);

  const handleSearch = (location) => {
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=c7829ba6854f44a1b60165127242806&q=${location}`;
    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=c7829ba6854f44a1b60165127242806&q=${location}&days=7`;

    axios.get(weatherUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching weather data', error));

    axios.get(forecastUrl)
      .then((response) => setForecastData(response.data))
      .catch((error) => console.error('Error fetching forecast data', error));
  };


  const [selectedUser, setSelectedUser] = useState(null);


  const handleSaveLocation = () => {
    if (!newLocation) {
      alert('Please enter a location');
      return;
    }
    if (!selectedUser) {
      alert('Please select a user');
      return;
    }

    axios.post(`http://localhost:2000/users/${selectedUser._id}/locations`, { name: newLocation })
      .then((response) => {
        const updatedUser = savedLocations.find((user) => user._id === selectedUser._id);
        updatedUser.savedLocations.push({ name: newLocation });
        setSavedLocations([...savedLocations]);
        setNewLocation('');
      })
      .catch((error) => console.error('Error saving location', error));
  };

  const handleDeleteLocation = (userId, locationId) => {
    axios.delete(`http://localhost:2000/users/${userId}/locations/${locationId}`)
      .then(() => {
        const updatedUsers = savedLocations.map(user =>
          user._id === userId ? { ...user, savedLocations: user.savedLocations.filter(loc => loc._id !== locationId) } : user
        );
        setSavedLocations(updatedUsers);
      })
      .catch((error) => console.error('Error deleting location', error));
  };

  const handleCreateUser = () => {
    if (!newUser) {
      alert('Please enter a username');
      return;
    }

    setEnteringUsername(true); // Set entering username state

    axios.post('http://localhost:2000/users', { username: newUser })
      .then((response) => {
        setSavedLocations([...savedLocations, response.data]);
        setUsername(response.data);
        setNewUser(''); // Reset newUser state after successful creation
        setEnteringUsername(false); // Reset entering username state
      })
      .catch((error) => {
        console.error('Error creating user', error);
        setEnteringUsername(false); // Reset entering username state on error
      });
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} onSave={handleSaveLocation} />
      <div className="App">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <Routes>
              <Route path="/" element={
                <>
                  <Location data={data} />
                  <Hourly data={forecastData} />
                </>
              } />
              <Route path="/daily-forecast" element={<DailyForecast data={forecastData} />} />
              <Route path="/Saved-Locations" element={
                <>
                <div className='ins'>
                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={newUser}
                      onChange={(e) => setNewUser(e.target.value)}
                    />
                    <button onClick={handleCreateUser}>Create User</button>

                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Location"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                    <button onClick={handleSaveLocation}>Save Location</button>
                  </div>
                  <div>
                    <select value={selectedUser ? selectedUser._id : ''} onChange={(e) => setSelectedUser(savedLocations.find((user) => user._id === e.target.value))}>
                      {savedLocations.map((user) => (
                        <option value={user._id}>{user.username}</option>
                      ))}
                    </select>
                  </div>
                  </div>
                  <SavedLocations users={savedLocations} onDelete={handleDeleteLocation} />
                </>
              } />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );

};
export default App;
