import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const cardSectionInformations = [
    {
      id: 1,
      title: "Serile Teatrului Studentesc",
      description: "IT Member",
    },
    {
      id: 2,
      title: "ITFest",
      description: "Project Manager",
    },
    {
      id: 3,
      title: "Academia SpEranței",
      description: "FR Team Leader",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
  ];
  return (
    <>
      <Section
        title="Projects"
        cardSectionInformations={cardSectionInformations}
      />
    </>
  );
}
