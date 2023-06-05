import styles from "../styles/FieldInfo.module.css";

export default function FieldInfo({ fieldName, fieldValue, id }) {
  const handleClick = (id) => {
    if (id) {
      global.router.push("/people/" + id);
    }
  };

  return (
    <section className={styles.field}>
      <p className={styles.fieldName}>{fieldName}</p>
      <p id={id} className={styles.fieldValue} onClick={() => handleClick(id)}>
        {fieldValue}
      </p>
    </section>
  );
}
