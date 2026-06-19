import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap} role="status" aria-live="polite">
      <span className={css.dot} />
      <span className={css.dot} />
      <span className={css.dot} />
      <span className={css.label}>Loading weather…</span>
    </div>
  );
}
