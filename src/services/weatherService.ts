import axios from "axios";
import type { City, CurrentWeather, WeatherResponse } from "../types/weather";

interface GeocodeResponse {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
}

// Turns a city name into coordinates. Returns null when nothing is found.
export async function geocodeCity(name: string): Promise<City | null> {
  const response = await axios.get<GeocodeResponse>(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name,
        count: 1,
        language: "uk",
        format: "json",
      },
    }
  );

  const first = response.data.results?.[0];
  if (!first) return null;

  return {
    id: first.id,
    name: first.name,
    country: first.country,
    latitude: first.latitude,
    longitude: first.longitude,
  };
}

// Fetches the current weather for given coordinates.
export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
  const response = await axios.get<WeatherResponse>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      },
    }
  );

  return response.data.current;
}
