import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import useCompareArrayOfObjects from "@/hooks/useCompare";
import axios from "axios";

export const UsersContext = createContext(null);
export const ProjectsContext = createContext(null);

export default function App({ Component, pageProps }) {
  global.router = useRouter();
  global.pageRoute = router.pathname;
  global.currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();

  const showNavigation = global.pageRoute === "/login" ? false : true;

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
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
        withCredentials: true,
      });

      const usersData = await res.data;

      const filteredUsers = [];

      for (const user of usersData) {
        const userDepartmentResponse = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/department`,
          withCredentials: true,
        });

        const userDepartment = await userDepartmentResponse.data;

        const userMentorResponse = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/mentor`,
          withCredentials: true,
        });

        const userMentor = await userMentorResponse.data;

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
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project`,
        withCredentials: true,
      });

      const projectsData = await res.data;

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
          {showNavigation && (
            <>
              <Navbar />
              <Sidebar />
            </>
          )}

          <Component {...pageProps} />
        </ProjectsContext.Provider>
      </UsersContext.Provider>
    </>
  );
}
