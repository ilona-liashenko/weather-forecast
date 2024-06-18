import React, { useState } from "react";
import useFetchData from "./FetchData";
import CurrentCard from "./CurrentCard";
import ForecastDetails from "./ForecastDetails";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("");
  const [lastSearchedLocation, setLastSearchedLocation] = useState("Ivano-Frankivsk");
  const [forecastType, setForecastType] = useState("current");
  const [error, setError] = useState(null);
  const api_key = "122fd86f3d457dcb0cae2fe31309f5f5";

  const { fetchWeatherData } = useFetchData(api_key, forecastType, lastSearchedLocation, setCurrentWeather, setForecast, setError);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleForecastTypeChange = (e) => {
    setForecastType(e.target.value);
  };

  const search = () => {
    if (location.trim() !== "") {
      fetchWeatherData({ location });
      setLastSearchedLocation(location);
      setLocation("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <CurrentCard
        currentWeather={currentWeather}
        location={location}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        search={search}
        forecastType={forecastType}
        handleForecastTypeChange={handleForecastTypeChange}
        error={error}
      />
      <ForecastDetails forecast={forecast} forecastType={forecastType} />
    </div>
  );
};

export default WeatherApp;