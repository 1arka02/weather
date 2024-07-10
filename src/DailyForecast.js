import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './DailyForecast.css';

const DailyForecast = ({data}) => {


    return (
        <div className="daily-forecast">
            <header>
                <h1>Daily Forecast</h1>
            </header>
            <main>
                { data? (
                    <div className="forecast-info">
                         <div className='weather-s'>
                                <h2><span>Your Location :</span></h2>
                                <p><span>City : </span>{data.location.name}</p>
                                <p><span>State: </span>{data.location.region}</p>
                                <p><span>Country:</span> {data.location.country}</p>
            </div>
                        {data.forecast.forecastday.map((day, index) => (
                            <div key={index} className="forecast-day">
                                <h3>{moment(day.date).format('MMMM Do YYYY')}</h3>
                                <div className="day-details">
                                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
                                    <div>
                                        <p>{day.day.condition.text}</p>
                                        <p>Max Temp: {day.day.maxtemp_c}°C</p>
                                        <p>Min Temp: {day.day.mintemp_c}°C</p>
                                        <p>Average Temp: {day.day.avgtemp_c}°C</p>
                                        <p>Max Wind: {day.day.maxwind_kph} km/h</p>
                                        <p>Humidity: {day.day.avghumidity}%</p>
                                        <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
                                        <p>UV Index: {day.day.uv}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </div>
    );
};

export default DailyForecast;
