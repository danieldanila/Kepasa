import styles from "../styles/SectionCard.module.css";

export default function SectionCard({ sectionCardInformations }) {
  return (
    <div className={styles.container}>
      {sectionCardInformations.map((sectionCardInformation) => {
        return (
          <div className={styles.sectionCard} key={sectionCardInformation.id}>
            <h3>{sectionCardInformation.title}</h3>
            <p>{sectionCardInformation.description}</p>
          </div>
        );
      })}
    </div>
  );
}
