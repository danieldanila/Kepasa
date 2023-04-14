export default function Section({ title, cardSectionInformations }) {
  return (
    <>
      <h2>{title}</h2>

      {cardSectionInformations.map((cardSectionInformation) => {
        return (
          <div key={cardSectionInformation.id}>
            <h3>{cardSectionInformation.title}</h3>
            <p>{cardSectionInformation.description}</p>
          </div>
        );
      })}
    </>
  );
}
