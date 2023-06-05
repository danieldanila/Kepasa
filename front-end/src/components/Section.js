import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

export default function Section({ title, page, sectionCardInformations }) {
  return (
    <section>
      <SectionHeader title={title} page={page} />
      {sectionCardInformations.length > 0 ? (
        <SectionCard sectionCardInformations={sectionCardInformations} />
      ) : (
        <p>You do not have any {page}.</p>
      )}
    </section>
  );
}
