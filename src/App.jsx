import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Durban");
  const [weather, setWeather] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setWeather({
      temperature: Math.round(response.data.temperature.current),
      city: response.data.city,
      description: response.data.condition.description
    });
    setLoaded(true);
  }

  function search() {
    const apiKey = "4bf39f80fc9d48003o92t3a6c3d6d47a";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function refresh() {
    return () => search();
  }

  function Forecast() {
    const temps = [22, 24, 23, 25, 26];

    return (
      <div className="forecast">
        {temps.map((temp, index) => (
          <div key={index} className="bubble">
            {temp}°
          </div>
        ))}
      </div>
    );
  }

  if (!loaded) {
    search();
    return <div className="loading">☁️ Loading..</div>;
  }

  return (
    <div className="app">
      <h1>🌈 Weather Vibes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search a city..."
          onChange={handleChange}
        />
        <button type="submit">✨</button>
      </form>

      <button className="refresh" onClick={refresh()}>
        🔄 Refresh
      </button>

      {weather && (
        <div className="weather">
          <h2>{weather.city}</h2>
          <div className="temp">{weather.temperature}°C</div>
          {weather.description && (
            <p className="desc">{weather.description}</p>
          )}
        </div>
      )}

      <h3>Next Days</h3>
      <Forecast />

      <footer>
        <a
          href="https://github.com/YOUR-USERNAME/weather-app"
          target="_blank"
          rel="noreferrer"
        >
          🌸 GitHub Repo
        </a>
      </footer>
    </div>
  );
}