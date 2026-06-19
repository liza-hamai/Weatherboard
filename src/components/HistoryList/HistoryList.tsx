import type { City } from "../../types/weather";
// import css from "./HistoryList.module.css";

interface HistoryListProps {
  history: City[];
  onSelect: (city: City) => void;
}

/**
 * ❗ NOT IMPLEMENTED — this is the main task (see README → "Your task").
 *
 * Build the search-history UI:
 *  - render `history` as a row of clickable chips (city name + country)
 *  - clicking a chip calls `onSelect(city)` to reload that city's weather
 *    WITHOUT geocoding again (coordinates are already in the City object)
 *  - if `history` is empty, render nothing
 *
 * A starter stylesheet lives in HistoryList.module.css — wire it up or
 * restyle it as you like.
 *
 * The `history` state itself (adding cities, dedup, max 5) is wired in
 * App.tsx — see the TODO there too.
 */
export default function HistoryList(_props: HistoryListProps) {
  return null;
}
