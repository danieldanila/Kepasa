import styles from "../../styles/ClassicActionableButton.module.css";

export default function ClassicActionableButton({
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
