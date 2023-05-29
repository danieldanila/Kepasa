import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import useCompareArrayOfObjects from "@/hooks/useCompare";

export const UsersContext = createContext(null);
export const ProjectsContext = createContext(null);

export default function App({ Component, pageProps }) {
  global.router = useRouter();
  global.pageRoute = router.pathname;
  global.currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();

  const emptyUser = {
    id: null,
    email: "",
    phone: "",
    socialMediaLink: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    isActive: false,
    isAdministrator: false,
    idDepartment: null,
    idMentor: null,
  };

  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(emptyUser);
  const haveUsersChanged = useCompareArrayOfObjects(users);

  useEffect(() => {
    async function getUserData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`);
      const usersData = await res.json();

      const filteredUsers = [];

      for (const user of usersData) {
        const userDepartmentResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/department`
        );

        const userDepartment = await userDepartmentResponse.json();

        const userMentorResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/mentor`
        );

        const userMentor = await userMentorResponse.json();

        const filteredUser = {
          id: user.id,
          email: user.email,
          phone: user.phone,
          socialMediaLink: user.socialMediaLink,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          birthday: user.birthday,
          isActive: user.isActive,
          isAdministrator: user.isAdministrator,
          idDepartment: user.idDepartment,
          departmentName: userDepartment.name,
          idMentor: user.idMentor,
          mentorName: userMentor ? userMentor.fullName : "No mentor",
        };

        filteredUsers.push(filteredUser);
      }

      setUsers(filteredUsers);
    }

    getUserData();
  }, [haveUsersChanged]);

  const emptyProject = {
    id: null,
    name: "",
  };

  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(emptyProject);
  const haveProjectsChanged = useCompareArrayOfObjects(projects);

  useEffect(() => {
    async function getProjectData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project`
      );
      const projectsData = await res.json();

      setProjects(projectsData);
    }

    getProjectData();
  }, [haveProjectsChanged]);

  return (
    <>
      <UsersContext.Provider
        value={{ users, setUsers, emptyUser, user, setUser }}
      >
        <ProjectsContext.Provider
          value={{ projects, setProjects, emptyProject, project, setProject }}
        >
          <Navbar />
          <Sidebar />
          <Component {...pageProps} />
        </ProjectsContext.Provider>
      </UsersContext.Provider>
    </>
  );
}
