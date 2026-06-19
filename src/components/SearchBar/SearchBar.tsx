import { useState } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (city: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = value.trim();
    if (query === "") return;
    onSubmit(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a city, e.g. Kyiv"
        autoComplete="off"
        autoFocus
      />
      <button className={css.button} type="submit">
        Check
      </button>
    </form>
  );
}
