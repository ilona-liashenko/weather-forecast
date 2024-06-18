import React from "react";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import fog from "../assets/images/fog.png";
import "./ForecastDetails.css";

const ForecastDetails = ({ forecast, forecastType }) => {
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Mist: fog,
    Haze: fog,
    Fog: fog,
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="forecast-container">
      {forecastType === "forecast" &&
        forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date forecast-item">
              {daysOfWeek[new Date(day.dt_txt).getDay()]}, {new Date(day.dt_txt).getDate()} {months[new Date(day.dt_txt).getMonth()]}
            </div>
            <img className="forecast-item" src={weatherImages[day.weather[0].main]} alt={day.weather[0].main} />
            <div className="forecast-temp forecast-item">{Math.floor(day.main.temp)}°</div>
            <div className="forecast-type forecast-item">{day.weather[0].main}</div>
          </div>
        ))}
      {forecastType === "3hour" &&
        forecast.map((forecastItem, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date forecast-item">
              {new Date(forecastItem.dt_txt).toLocaleString("en-US", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <img className="forecast-item" src={weatherImages[forecastItem.weather[0].main]} alt={forecastItem.weather[0].main} />
            <div className="forecast-temp forecast-item">{Math.floor(forecastItem.main.temp)}°</div>
            <div className="forecast-type forecast-item">{forecastItem.weather[0].main}</div>
          </div>
        ))}
    </div>
  );
};

export default ForecastDetails;