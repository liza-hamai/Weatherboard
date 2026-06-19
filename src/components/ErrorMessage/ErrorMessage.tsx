import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  text?: string;
}

export default function ErrorMessage({
  text = "Something went wrong. Try again.",
}: ErrorMessageProps) {
  return <p className={css.message}>{text}</p>;
}
