import React from "react";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import fog from "../assets/images/fog.png";
import "./CurrentCard.css";

const CurrentCard = ({ currentWeather, location, handleInputChange, handleKeyDown, search, forecastType, handleForecastTypeChange, error }) => {
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Mist: fog,
    Haze: fog,
    Fog: fog,
  };

  const weatherImage = currentWeather.weather ? weatherImages[currentWeather.weather[0].main] : null;

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return (
    <div className="current-weather-card">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{currentWeather.name}</div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      <div className="forecast-option">
        <label className="forecast-label">
          <input className="forecast-input" type="radio" value="current" checked={forecastType === "current"} onChange={handleForecastTypeChange} />
          Current Weather
        </label>
        <label className="forecast-label">
          <input className="forecast-input" type="radio" value="3hour" checked={forecastType === "3hour"} onChange={handleForecastTypeChange} />
          3-Hour Forecast
        </label>
        <label className="forecast-label">
          <input className="forecast-input" type="radio" value="forecast" checked={forecastType === "forecast"} onChange={handleForecastTypeChange} />
          5-Days Forecast
        </label>
      </div>
      <div className="weather-date">
        <p>{formattedDate}</p>
      </div>
      <div className="weather">
        <div className="weather-wrap">
          <div className="temp">{currentWeather.main ? `${Math.floor(currentWeather.main.temp)}°` : null}</div>
          <div className="weather-type">{currentWeather.weather ? currentWeather.weather[0].main : null}</div>
          <div className="min-max-temp">
            {currentWeather.main ? (
              <>
                <span className="min-max-data">Min: {Math.floor(currentWeather.main.temp_min)}°</span>
                <span className="min-max-data">Max: {Math.floor(currentWeather.main.temp_max)}°</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="weather-wrap">
          <img src={weatherImage} alt={currentWeather.weather ? currentWeather.weather[0].main : "Weather"} />
        </div>
      </div>
      <div className="weather-data">
        <div className="humidity">
          <div className="data-name">Humidity</div>
          <i className="fa-solid fa-droplet"></i>
          <div className="data">{currentWeather.main ? currentWeather.main.humidity : null}%</div>
        </div>
        <div className="wind">
          <div className="data-name">Wind</div>
          <i className="fa-solid fa-wind"></i>
          <div className="data">{currentWeather.wind ? currentWeather.wind.speed : null} km/h</div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CurrentCard;