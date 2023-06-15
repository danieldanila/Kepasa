import styles from "../../styles/ClassicButton.module.css";

export default function ClassicButton({
  actionFunction,
  functionData,
  disabledCondition,
  icon,
}) {
  return (
    <button
      onClick={() => actionFunction(functionData)}
      disabled={disabledCondition}
      className={`${styles.editButton} ${
        disabledCondition && styles.editButtonDisabled
      }`}
    >
      {`${icon}`}
    </button>
  );
}
