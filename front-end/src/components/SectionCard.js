import styles from "../styles/SectionCard.module.css";

export default function SectionCard({ page, sectionCardInformations }) {
  const handleClick = (e) => {
    if (e.target.id) {
      global.router.push(`/${page}/` + e.target.id);
    }
  };

  return (
    <div className={styles.container}>
      {sectionCardInformations.map((sectionCardInformation) => {
        return (
          <div
            className={styles.sectionCard}
            key={sectionCardInformation.id}
            id={sectionCardInformation.id}
            onClick={(e) => handleClick(e)}
          >
            <h3>{sectionCardInformation.title}</h3>
            <p>{sectionCardInformation.description}</p>
          </div>
        );
      })}
    </div>
  );
}
