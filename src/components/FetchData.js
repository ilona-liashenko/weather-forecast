import { useEffect, useCallback } from "react";

const useFetchData = (api_key, forecastType, lastSearchedLocation, setCurrentWeather, setForecast, setError) => {
  const fetchWeatherData = useCallback(async ({ location, lat, lon }) => {
    try {
      const currentWeatherUrl = location
        ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

      const forecastUrl = location
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${api_key}`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

      const currentWeatherRes = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherRes.json();

      if (currentWeatherRes.ok) {
        setCurrentWeather(currentWeatherData);

        if (forecastType === "forecast" || forecastType === "3hour") {
          const forecastRes = await fetch(forecastUrl);
          const forecastData = await forecastRes.json();

          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);

          let filteredForecast;
          if (forecastType === "forecast") {
            filteredForecast = forecastData.list.filter((item) => {
              const itemDate = new Date(item.dt_txt);
              return itemDate >= tomorrow && itemDate.getHours() === 12;
            });
          } else if (forecastType === "3hour") {
            filteredForecast = forecastData.list.filter((item) => {
              const itemDate = new Date(item.dt_txt);
              return itemDate >= tomorrow;
            }).slice(0, 8);
          }

          setForecast(filteredForecast);
        } else {
          setForecast([]);
        }

        setError(null);
      } else {
        setError("Location not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
    }
  }, [api_key, forecastType, setCurrentWeather, setForecast, setError]);

  useEffect(() => {
    fetchWeatherData({ location: lastSearchedLocation });
  }, [fetchWeatherData, forecastType, lastSearchedLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error fetching user's location:", error);
          fetchWeatherData({ location: lastSearchedLocation });
        }
      );
    } else {
      fetchWeatherData({ location: lastSearchedLocation });
    }
  }, [fetchWeatherData, lastSearchedLocation]);

  return { fetchWeatherData };
};

export default useFetchData;