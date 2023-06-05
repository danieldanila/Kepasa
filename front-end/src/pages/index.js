import Section from "@/components/Section";
import { useContext, useEffect, useRef, useState } from "react";
import { LoggedUserContext } from "./_app";
import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";
import Loading from "@/components/Loading";

export default function Home() {
  const toastRef = useRef(null);
  const { loggedUser } = useContext(LoggedUserContext);

  const [userRolesOnProjects, setUsersRolesOnProjects] = useState(null);
  const [userObjectives, setUserObjectives] = useState(null);
  const [sectionCardInformationsProjects, setSectionCardInformationsProjects] =
    useState(null);
  const [sectionCardInformationsGoals, setSectionCardInformationsGoals] =
    useState(null);

  useEffect(() => {
    async function getUserRolesOnProjects() {
      if (loggedUser) {
        const userRolesOnProjectsData = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${loggedUser.id}`,
          toastRef
        );

        setUsersRolesOnProjects(userRolesOnProjectsData);
      }
    }

    getUserRolesOnProjects();
  }, [loggedUser]);

  useEffect(() => {
    async function getUserObjectives() {
      if (loggedUser) {
        const userObjectivesData = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${loggedUser.id}/objectives`,
          toastRef
        );

        setUserObjectives(userObjectivesData);
      }
    }

    getUserObjectives();
  }, [loggedUser]);

  useEffect(() => {
    if (userRolesOnProjects) {
      const filteredUserRolesOnProjects = userRolesOnProjects.map((item) => {
        return {
          id: item.Project.id,
          title: item.Project.name,
          description: item.Role.name,
        };
      });

      setSectionCardInformationsProjects(filteredUserRolesOnProjects);
    }
  }, [userRolesOnProjects]);

  useEffect(() => {
    if (userObjectives) {
      const filteredUserObjectives = userObjectives.map((item) => {
        if (!item.isFinished) {
          return {
            id: item.id,
            title: item.name,
            description: item.Period.endDate,
          };
        } else {
          return null;
        }
      });

      setSectionCardInformationsGoals(filteredUserObjectives.filter(Boolean));
    }
  }, [userObjectives]);

  return (
    <>
      {loggedUser &&
      sectionCardInformationsProjects &&
      sectionCardInformationsGoals ? (
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
            title="Your Current Goals"
            page="goals"
            sectionCardInformations={sectionCardInformationsGoals}
          />
        </main>
      ) : (
        <Loading />
      )}
      <Toast ref={toastRef} />
    </>
  );
}
