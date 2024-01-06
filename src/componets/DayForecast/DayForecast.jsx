import React from 'react';
import './DayForecast.css';

const DayForecast = ({ day, weatherIcon, temperature }) => {
  return (
    <div className="day-forecast">
      <div className="day-header">{day}</div>
      <img src={weatherIcon} alt="Weather Icon" />
      <div className="temperature">{temperature}&deg;C</div>
    </div>
  );
};


export default DayForecast;