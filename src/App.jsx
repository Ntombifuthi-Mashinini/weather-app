import React, { useState } from "react";
import axios from "axios";

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
      <ul>
        {temps.map((temp, index) => (
          <li key={index}>{temp}°C</li>
        ))}
      </ul>
    );
  }

  if (!loaded) {
    search();
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>🌤 Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter city..."
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      <br />
      <button onClick={refresh()}>Refresh</button>

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>{weather.temperature}°C</p>

          {weather.description && (
            <p>Condition: {weather.description}</p>
          )}
        </div>
      )}

      <h3>5-Day Forecast</h3>
      <Forecast />

      <footer style={{ marginTop: "40px" }}>
        <a
          href="https://github.com/Ntombifuthi-Mashinini/weather-app.git"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}