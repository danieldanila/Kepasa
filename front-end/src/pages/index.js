import Section from "@/components/Section";
import { useContext, useEffect, useRef, useState } from "react";
import { LoggedUserContext } from "./_app";
import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";

export default function Home() {
  const toastRef = useRef(null);
  const { loggedUser } = useContext(LoggedUserContext);

  const [userRolesOnProjects, setUsersRolesOnProjects] = useState(null);
  useEffect(() => {
    async function getUserRolesOnProjects() {
      if (loggedUser) {
        console.log(loggedUser.id);

        const userRolesOnProjectsData = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${loggedUser.id}`,
          toastRef
        );

        console.log(userRolesOnProjects);
        setUsersRolesOnProjects(userRolesOnProjectsData);
      }
    }

    getUserRolesOnProjects();
  }, [loggedUser]);

  let sectionCardInformationsProjects;
  useEffect(() => {
    if (userRolesOnProjects) {
      sectionCardInformationsProjects = userRolesOnProjects.map((item) => {
        return {
          id: item.Project.id,
          title: item.Project.name,
          description: item.Role.name,
        };
      });
    }
  }, [userRolesOnProjects]);

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
        Hi {loggedUser?.fullName}, glad you're here 👋
      </h2>
      <Section
        title="Your Projects"
        page="projects"
        sectionCardInformations={
          sectionCardInformationsProjects ? sectionCardInformationsProjects : []
        }
      />
      <Section
        title="Your Goals"
        page="goals"
        sectionCardInformations={sectionCardInformationsGoals}
      />
      <Toast ref={toastRef} />
    </main>
  );
}
