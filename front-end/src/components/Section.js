import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

export default function Section({ title, page, sectionCardInformations }) {
  return (
    <section>
      <SectionHeader title={title} page={page} />
      <SectionCard sectionCardInformations={sectionCardInformations} />
    </section>
  );
}
