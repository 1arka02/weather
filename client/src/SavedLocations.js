// SavedLocations.js

import React from 'react';
import axios from 'axios';
import './SavedLocations.css';

const SavedLocations = ({ users, onDelete }) => {
  const handleDeleteLocation = (userId, locationId) => {
    axios.delete(`weather-gamma-swart.vercel.app
/${userId}/locations/${locationId}`)
      .then(() => {
        onDelete(userId, locationId);
      })
      .catch((error) => console.error('Error deleting location', error));
  };

  return (
    <div className="saved-locations">
      {users.map((user) => (
        <div key={user._id} className="user-locations">
          <h2>{user.username}</h2>
          <ul>
            {user.savedLocations.map((location) => (
              <li key={location._id}>
                {location.name}
                <button onClick={() => onDelete(user._id, location._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SavedLocations;
