import { useRef } from "react";
import styles from "../../styles/ClassicButton.module.css";

export default function ClassicButton({ onClick, text, hasInput, onChange }) {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <button
      className={styles.button}
      onClick={hasInput ? handleButtonClick : onClick}
    >
      {text}
      {hasInput && (
        <input
          ref={fileInputRef}
          className={styles.input}
          type="file"
          accept=".csv"
          onChange={onChange}
        />
      )}
    </button>
  );
}
