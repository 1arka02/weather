import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Location.css';

const Location = ({data}) => {

  return (
    <div className="weather-app">
      <main>
       { data ? (
          <div className="weather-info">
            <div className='weather-Location'>
            <h2>Your Location :</h2>
            <p><span>City : </span>{data.location.name}</p>
            <p><span>State: </span>{data.location.region}</p>
            <p><span>Country:</span> {data.location.country}</p>
            </div>
            <div className="weather-details">
              {data.current && (
                <div className='details'>
                  <div>
                  <img src={data.current.condition.icon} alt={data.current.condition.text} />
                  </div>
                  <div>
                    <p><span>{data.current.condition.text}</span></p>
                    <p><span>{data.current.temp_c}°C</span></p>
                    <p><span>Humidity:</span> {data.current.humidity}%</p>
                    <p><span>Wind Speed:</span> {data.current.wind_kph} km/h</p>
                    <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </main>
    </div>
  );
};

export default Location;