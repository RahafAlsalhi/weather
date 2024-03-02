import React, { useState } from "react";
import './WeatherApp.css';
import './userInfo.jsx';
import './SearchHistory.jsx'

const api = {
    key: "79fd1ce87286a9be89d93cba46a56b86",
    base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApp = () => {
    const [search, setSearch] = useState("");
    const [forecast, setForecast] = useState([]);
    const userInfo = ()=>{
        <link to="/userInfo"> userInfo</link>
    }
    const SearchHistory = ()=>{
        <link to="/SearchHistory"> userInfo</link>
    }
    const searchPressed = () => {
        fetch(`${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                // Check if result.list exists and is an array before updating forecast
                if (Array.isArray(result.list)) {
                    // Filter the forecast data to get only one entry per day
                    const filteredForecast = result.list.filter((item, index) => index % 8 === 0);
                    setForecast(filteredForecast);
                } else {
                    setForecast([]); // Set forecast to empty array if result.list is not an array
                }
            })
            .catch(error => {
                console.error("Error fetching forecast data:", error);
                setForecast([]); // Set forecast to empty array on error
            });
    };

    return (
        <div className="container">
        <div className="history-info">
              <button className="info" onClick={userInfo}> User Information </button>
              <button className="history" onClick={SearchHistory}> Search History </button>

        </div>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Enter your city" onChange={(e) => setSearch(e.target.value)} />
                <button className="search" onClick={searchPressed}>Search</button>
            </div>
            {forecast.length > 0 ? (
                forecast.map((day) => (
                    <div key={day.dt} className="forecast-card">
                        <b><p >Date: {new Date(day.dt * 1000).toLocaleDateString()}</p></b>
                      <b><p>Temperature: {day.main.temp}°C</p></b>
                      <b><p>Weather: {day.weather[0].main}</p></b>
                      <b><p>Description: {day.weather[0].description}</p></b>
                    </div>
                ))
            ) : (
                <p>No forecast available</p>
            )}
        </div>
    );
};

export default WeatherApp;