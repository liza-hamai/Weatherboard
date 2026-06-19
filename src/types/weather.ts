export interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
}

// City is what we keep around for the card and for the search history.
export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
