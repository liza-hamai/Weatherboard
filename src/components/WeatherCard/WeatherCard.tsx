import type { City, CurrentWeather } from "../../types/weather";
import css from "./WeatherCard.module.css";

interface WeatherCardProps {
  city: City;
  weather: CurrentWeather;
}

/**
 * Maps an Open-Meteo WMO weather code to a short description + emoji.
 *
 * ⚠️ INCOMPLETE ON PURPOSE (optional task).
 * Only a few codes are filled in. The full WMO code table is documented by
 * Open-Meteo. Any code that isn't listed here falls back to "Unknown".
 * See README → "Optional task #2".
 */
function describeWeather(code: number): { label: string; icon: string } {
  const map: Record<number, { label: string; icon: string }> = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    // TODO: fog (45, 48), drizzle (51, 53, 55), rain (61, 63, 65),
    //       snow (71, 73, 75), showers (80, 81, 82), thunderstorm (95, 96, 99)...
  };

  return map[code] ?? { label: "Unknown", icon: "❓" };
}

export default function WeatherCard({ city, weather }: WeatherCardProps) {
  const desc = describeWeather(weather.weather_code);

  return (
    <article className={css.card}>
      <header className={css.head}>
        <div>
          <h2 className={css.city}>{city.name}</h2>
          <p className={css.country}>{city.country}</p>
        </div>
        <span className={css.icon} aria-hidden="true">
          {desc.icon}
        </span>
      </header>

      <div className={css.tempRow}>
        <span className={css.temp}>{Math.round(weather.temperature_2m)}°</span>
        <span className={css.desc}>{desc.label}</span>
      </div>

      <dl className={css.stats}>
        <div className={css.stat}>
          <dt className={css.statLabel}>Humidity</dt>
          <dd className={css.statValue}>{weather.relative_humidity_2m}%</dd>
        </div>
        <div className={css.stat}>
          <dt className={css.statLabel}>Wind</dt>
          <dd className={css.statValue}>{weather.wind_speed_10m} km/h</dd>
        </div>
      </dl>
    </article>
  );
}
