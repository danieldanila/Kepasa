import Section from "@/components/Section";
import { useContext, useEffect } from "react";
import { LoggedUserContext } from "./_app";

export default function Home() {
  const { loggedUser } = useContext(LoggedUserContext);

  const sectionCardInformationsProjects = [
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
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
    {
      id: 4,
      title: "Promo",
      description: "HR Assistant",
    },
  ];

  const sectionCardInformationsGoals = [
    {
      id: 1,
      title: "Master HTML and CSS",
      description: "31.08.2023",
    },
    {
      id: 2,
      title: "Master Javascript",
      description: "15.10.2023",
    },
    {
      id: 3,
      title: "Master React.js",
      description: "20.12.2023",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
    {
      id: 4,
      title: "Master Next.js",
      description: "10.02.2024",
    },
  ];

  return (
    <main>
      <h2 className="pageTitle">
        Hi {loggedUser.fullName}, glad you're here 👋
      </h2>
      <Section
        title="Your Projects"
        page="projects"
        sectionCardInformations={sectionCardInformationsProjects}
      />
      <Section
        title="Your Goals"
        page="goals"
        sectionCardInformations={sectionCardInformationsGoals}
      />
    </main>
  );
}
