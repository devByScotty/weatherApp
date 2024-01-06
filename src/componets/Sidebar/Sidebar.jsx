import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './Sidebar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import getWeatherData from '../../routes/baseWeather';
import DayForecast from '../DayForecast/DayForecast';
import Highlights from '../Highlights/Highlights';
import getForecastData from '../../routes/cityWeather';

const Sidebar = () => {

  const [city, setCity] = useState('Secunda');
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getWeatherData(city);
      const fdata = await getForecastData(city);
      setWeatherData(data);
      setForecastData(fdata);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city.trim() !== '') {
      fetchData();
    }
  }, [city]);

  return (
    <div className='main'>
      <div className='sidebar'>
        <div className='container'>
          <div className='searchbox'>
            <SearchOutlinedIcon className='icon' />
            <input
              value={city}
              type="text"
              onChange={(event) => setCity(event.target.value)}
              placeholder='Location'
              className='searchArea'
            />
            <MyLocationOutlinedIcon className='icon2' />
          </div>

          <div className='bottombox'>
            <div className='top-section'>
              {isLoading ? (
                <CircularProgress /> // Display loader while data is being fetched
              ) : (
                <>
                  {weatherData && weatherData.weather && (
                    <>
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className='imgElement'
                      />
                      <h1>{weatherData.main.temp}°C</h1>
                      <p>{weatherData.weather[0].main}</p>
                    </>
                  )}
                </>
              )}
            </div>

            <div className='bottom-section'>
              {isLoading ? (
                <CircularProgress /> // Display loader while data is being fetched
              ) : (
                <>
                  {weatherData && weatherData.weather && (
                    <>
                      <h3>{weatherData.weather[0].description}</h3>
                      <h3>Humidity : {weatherData.main.humidity}</h3>
                      <h1>
                        {weatherData.name} , {weatherData.sys.country}
                      </h1>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='mainbar'>

        <h1>7 Day Forecast</h1>
        <div className="forecast-container">
          {isLoading ? (
            <CircularProgress /> // Display loader while data is being fetched
          ) : (
            <>
              {forecastData &&
                forecastData.list &&
                forecastData.list.map((day, index) => {
                  const localDate = new Date(day.dt_txt + ' UTC');
                  const today = new Date();
                  const next7DaysData = Array.from({ length: 7 }, (_, index) => {
                    const nextDay = new Date(today);
                    nextDay.setDate(today.getDate() + index);
                    return nextDay;
                  });

                  return (
                    <DayForecast
                      key={index}
                      day={next7DaysData[index].toLocaleString('en-US', { weekday: 'long' })}
                      weatherIcon={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      temperature={day.main.temp}
                    />
                  );
                })}
            </>
          )}
        </div>

        <h1 className='highlights-title'>Today's Forecast</h1>
        {isLoading ? (
          <CircularProgress /> // Display loader while data is being fetched
        ) : (
          <>
            {weatherData && weatherData.weather && (
              <div className="highlight-container">
                <Highlights
                  description="Feels Like"
                  title={`${weatherData.main.feels_like}°C`}
                  icon='☀️'
                />
                <Highlights
                  title={`${weatherData.main.pressure} hPa`}
                  icon={weatherData.main.temp > 15 ? '☀️' : '❄️'}
                  description="Pressure"
                />
                <Highlights
                  title={`${weatherData.wind.speed} m/s`}
                  icon="💨"
                  description="Wind Speed"
                />
                <Highlights
                  title2={`${weatherData.main.temp_max} °C`}
                  icon="🌡️"
                  description2="Max Temp"
                />
                <Highlights
                  title2={`${weatherData.main.temp_min} °C`}
                  icon="🌡️"
                  description2="Min Temp"
                />
                <Highlights
                  title2={`${weatherData.main.humidity} %`}
                  icon="💧"
                  description2="Humidity"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
