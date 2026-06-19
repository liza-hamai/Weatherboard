import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import WeatherCard from "../WeatherCard/WeatherCard";
import HistoryList from "../HistoryList/HistoryList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchWeather, geocodeCity } from "../../services/weatherService";
import type { City, CurrentWeather } from "../../types/weather";

export default function App() {
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // --- search history -------------------------------------------------------
  // TODO (main task): hold the list of recently searched cities here.
  // Requirements:
  //   - keep at most 5 cities
  //   - newest first
  //   - no duplicates (compare by city.id)
  //   - add a city only after its weather loads successfully
  const [history] = useState<City[]>([]);

  // Loads weather for an already-resolved city (used by history clicks too,
  // so it must NOT geocode again).
  const loadWeatherFor = async (target: City) => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const current = await fetchWeather(target.latitude, target.longitude);
      setCity(target);
      setWeather(current);
      // TODO (main task): push `target` into history here (dedup, max 5).
    } catch {
      setError("Couldn't load weather. Check your connection and try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Called from the search bar: name -> coordinates -> weather.
  const handleSearch = async (name: string) => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    setWeather(null);
    try {
      const resolved = await geocodeCity(name);
      if (!resolved) {
        setNotFound(true);
        setCity(null);
        return;
      }
      const current = await fetchWeather(resolved.latitude, resolved.longitude);
      setCity(resolved);
      setWeather(current);
      // TODO (main task): push `resolved` into history here (dedup, max 5).
    } catch {
      setError("Couldn't load weather. Check your connection and try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const showIdle = !loading && !error && !notFound && !weather;

  return (
    <main className={css.app}>
      <header className={css.header}>
        <h1 className={css.title}>WeatherBoard</h1>
        <p className={css.subtitle}>Current conditions for any city.</p>
      </header>

      <SearchBar onSubmit={handleSearch} />

      {/* When history is implemented, these chips reload a city instantly. */}
      <HistoryList history={history} onSelect={loadWeatherFor} />

      {loading && <Loader />}
      {error && <ErrorMessage text={error} />}
      {notFound && <ErrorMessage text="City not found. Try another name." />}
      {showIdle && <p className={css.hint}>Type a city name to get started.</p>}

      {!loading && city && weather && (
        <WeatherCard city={city} weather={weather} />
      )}
    </main>
  );
}
