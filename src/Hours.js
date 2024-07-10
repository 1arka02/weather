import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Hours.css';

const Hourly = ({data}) => {

  // const [weather, setWeather] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchLocationAndWeather = async () => {
  //     try {
  //       const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7829ba6854f44a1b60165127242806&q=${location}&hours=24`);
  //       const weatherData = await weatherResponse.json();
  //       setWeather(weatherData);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(`Error fetching location or weather data: ${error.message}`);
  //       setLoading(false);
  //     }
  //   };

  //   fetchLocationAndWeather();
  // }, []);
  const getHourlyForecast = () => {
    if (!data) return [];
    const hourlyData = data.forecast.forecastday[0].hour;
    return hourlyData.filter((_, index) => index % 2 === 0);
};
  return (
    <div className="weather-app">
      <main>
        {data? (
          <div className="weather-forecast">
            <div><h2>Hourly Forecast</h2></div>
            <div className="hourly-forecast">
                            {getHourlyForecast().map((hour, index) => (
                                <div key={index} className="hourly">
                                    <p>{moment(hour.time).format('h:mm A')}</p>
                                    <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
                                    <p>{hour.temp_c}°C</p>
                                    <p>{hour.condition.text}</p>
                                </div>
                            ))}
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </main>
    </div>
  );
};

export default Hourly;