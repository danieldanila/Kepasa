import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useCompareArrayOfObjects from "@/hooks/useCompare";
import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";

export const LoggedUserContext = createContext(null);
export const UsersContext = createContext(null);
export const ProjectsContext = createContext(null);
export const DepartmentsContext = createContext(null);

export default function App({ Component, pageProps }) {
  global.router = useRouter();
  global.pageRoute = router.pathname;
  global.currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();

  const toastRef = useRef(null);

  const showNavigation = global.pageRoute === "/login" ? false : true;

  const [loggedUser, setLoggedUser] = useState(null);

  const memoizedLoggedUser = useMemo(() => loggedUser, [loggedUser]);

  useEffect(() => {
    async function getCurrentUser() {
      const loggedUserData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/currentUser`,
        toastRef
      );

      setLoggedUser(loggedUserData);
    }

    getCurrentUser();
  }, []);

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
    mentor: {
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
    },
    Department: {
      id: null,
      name: "",
    },
  };

  const [user, setUser] = useState(emptyUser);
  const [users, setUsers] = useState(null);

  const emptyProject = {
    id: null,
    name: "",
  };

  const [project, setProject] = useState(emptyProject);
  const [projects, setProjects] = useState(null);

  const emptyDepartment = {
    id: null,
    name: "",
  };

  const [department, setDepartment] = useState(emptyDepartment);
  const [departments, setDepartments] = useState(null);

  const haveUsersChanged = useCompareArrayOfObjects(users);

  useEffect(() => {
    async function getUserData() {
      const usersData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/withDepartmentAndMentorNames`,
        toastRef
      );

      setUsers(usersData);
    }

    if (loggedUser) {
      getUserData();
    }
  }, [haveUsersChanged]);

  const haveProjectsChanged = useCompareArrayOfObjects(projects);

  useEffect(() => {
    async function getProjectData() {
      const projectsData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project`,
        toastRef
      );

      setProjects(projectsData);
    }

    if (loggedUser) {
      getProjectData();
    }
  }, [haveProjectsChanged]);

  const haveDepartmentsChanged = useCompareArrayOfObjects(departments);

  useEffect(() => {
    async function getDepartmentData() {
      const departmentData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department`,
        toastRef
      );

      setDepartments(departmentData);
    }

    if (loggedUser) {
      getDepartmentData();
    }
  }, [haveDepartmentsChanged]);

  return (
    <>
      <LoggedUserContext.Provider
        value={{ loggedUser: memoizedLoggedUser, setLoggedUser }}
      >
        <UsersContext.Provider
          value={{ users, setUsers, emptyUser, user, setUser }}
        >
          <ProjectsContext.Provider
            value={{ projects, setProjects, emptyProject, project, setProject }}
          >
            <DepartmentsContext.Provider
              value={{
                departments,
                setDepartments,
                emptyDepartment,
                department,
                setDepartment,
              }}
            >
              {showNavigation && (
                <>
                  <Navbar />
                  <Sidebar />
                </>
              )}
              <Component {...pageProps} />
            </DepartmentsContext.Provider>
          </ProjectsContext.Provider>
        </UsersContext.Provider>
      </LoggedUserContext.Provider>
      <Toast ref={toastRef} />
    </>
  );
}
