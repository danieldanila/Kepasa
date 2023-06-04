import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

export const UsersContext = createContext(null);
export const ProjectsContext = createContext(null);
export const DepartmentsContext = createContext(null);

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

  return (
    <>
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
    </>
  );
}
