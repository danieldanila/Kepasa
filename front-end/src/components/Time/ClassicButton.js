import styles from "../../styles/ClassicButton.module.css";

export default function ClassicButton({ onClick, text }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
