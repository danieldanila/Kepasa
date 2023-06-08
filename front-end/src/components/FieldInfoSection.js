import FieldInfo from "./FieldInfo";
import styles from "../styles/FieldInfoSection.module.css";

export default function FieldInfoSection({
  firstFieldName,
  firstFieldValue,
  secondFieldName,
  secondFieldValue,
  firstId,
  secondId,
  firstPageName,
  secondPageName,
}) {
  return (
    <section className={styles.fieldsSection}>
      <FieldInfo
        id={firstId}
        fieldName={firstFieldName}
        fieldValue={firstFieldValue}
        pageName={firstPageName}
      />
      <FieldInfo
        id={secondId}
        fieldName={secondFieldName}
        fieldValue={secondFieldValue}
        pageName={secondPageName}
      />
    </section>
  );
}
