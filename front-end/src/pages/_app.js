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
export const NotificationContext = createContext(null);
export const UsersContext = createContext(null);
export const ProjectsContext = createContext(null);
export const DepartmentsContext = createContext(null);
export const RolesContext = createContext(null);
export const RolesProjectsContext = createContext(null);
export const UsersProjectsRolesContext = createContext(null);
export const PeriodsContext = createContext(null);
export const TaskTypesContext = createContext(null);
export const ActivityReportsContext = createContext(null);

export default function App({ Component, pageProps }) {
  global.router = useRouter();
  global.pageRoute = router.pathname;
  global.currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();

  const [notifications, setNotifications] = useState([]);
  const toastRef = useRef(null);

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
  const [users, setUsers] = useState([]);

  const emptyProject = {
    id: null,
    name: "",
  };

  const [project, setProject] = useState(emptyProject);
  const [projects, setProjects] = useState([]);

  const emptyDepartment = {
    id: null,
    name: "",
  };

  const [department, setDepartment] = useState(emptyDepartment);
  const [departments, setDepartments] = useState([]);

  const emptyRole = {
    id: null,
    name: "",
    idDepartment: null,
    idSuperiorRole: null,
    Department: {
      id: null,
      name: "",
    },
    superiorRole: {
      id: null,
      name: "",
      idDepartment: null,
      idSuperiorRole: null,
    },
  };

  const [role, setRole] = useState(emptyRole);
  const [roles, setRoles] = useState([]);

  const emptyRoleProject = {
    id: null,
    idRole: null,
    idProject: null,
    hourlyPay: 0,
    Role: {
      id: null,
      name: "",
      idDepartment: null,
      idSuperiorRole: null,
    },
    Project: {
      id: null,
      name: "",
    },
  };

  const [roleProject, setRoleProject] = useState(emptyRoleProject);
  const [rolesProjects, setRolesProjects] = useState([]);

  const emptyUsersProjectsRoles = {
    id: null,
    idUser: null,
    idProject: null,
    idRole: null,
    User: {
      id: null,
      fullName: "",
    },
    Project: {
      id: null,
      name: "",
    },
    Role: {
      id: null,
      name: "",
    },
  };

  const [userProjectRole, setUserProjectRole] = useState(
    emptyUsersProjectsRoles
  );
  const [usersProjectsRoles, setUsersProjectsRoles] = useState([]);

  const emptyPeriod = {
    id: null,
    name: "",
    startDate: "",
    endDate: "",
  };

  const [period, setPeriod] = useState(emptyPeriod);
  const [periods, setPeriods] = useState([]);

  const emptyTaskType = {
    id: null,
    name: "",
  };

  const [taskType, setTaskType] = useState(emptyTaskType);
  const [taskTypes, setTaskTypes] = useState([]);

  const emptyActivityReport = {
    id: null,
    description: "",
    investedTime: 0,
    date: "",
    isApproved: false,
    isSent: false,
    rejectJustification: null,
    idUser: null,
    idApprover: null,
    idPeriod: null,
    idProject: null,
    idTaskType: null,
    User: {
      id: null,
      fullName: "",
    },
    Approver: {
      id: null,
      fullName: "",
    },
    Period: {
      id: null,
      name: "",
      startDate: "",
      endDate: "",
    },
    Project: {
      id: null,
      name: "",
    },
    TaskType: {
      id: null,
      name: "",
    },
  };

  const [activityReport, setActivityReport] = useState(emptyActivityReport);
  const [activityReports, setActivityReports] = useState([]);

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

  const haveRolesChanged = useCompareArrayOfObjects(roles);

  useEffect(() => {
    async function getRoleData() {
      const roleData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/role`,
        toastRef
      );

      setRoles(roleData);
    }

    if (loggedUser) {
      getRoleData();
    }
  }, [haveRolesChanged]);

  const haveRolesProjectsChanged = useCompareArrayOfObjects(rolesProjects);

  useEffect(() => {
    async function getRoleProjectData() {
      const roleProjectData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rolesProjects`,
        toastRef
      );

      const roleProjectDataWithId = roleProjectData.map((item) => {
        const id = `${item.idRole}:${item.idProject}`;
        return { ...item, id };
      });

      setRolesProjects(roleProjectDataWithId);
    }

    if (loggedUser) {
      getRoleProjectData();
    }
  }, [haveRolesProjectsChanged]);

  const haveUsersProjectsRolesChanged =
    useCompareArrayOfObjects(usersProjectsRoles);

  useEffect(() => {
    async function getUsersProjectsRolesData() {
      const usersProjectsRolesData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles`,
        toastRef
      );

      const usersProjectsRolesWithId = usersProjectsRolesData.map((item) => {
        const id = `${item.idUser}:${item.idProject}`;
        return { ...item, id };
      });

      setUsersProjectsRoles(usersProjectsRolesWithId);
    }

    if (loggedUser) {
      getUsersProjectsRolesData();
    }
  }, [haveUsersProjectsRolesChanged]);

  const havePeriodsChanged = useCompareArrayOfObjects(periods);

  useEffect(() => {
    async function getPeriodData() {
      const periodData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/period`,
        toastRef
      );

      setPeriods(periodData);
    }

    if (loggedUser) {
      getPeriodData();
    }
  }, [havePeriodsChanged]);

  const haveTaskTypesChanged = useCompareArrayOfObjects(taskTypes);

  useEffect(() => {
    async function getTaskTypeData() {
      const taskTypeData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/taskType`,
        toastRef
      );

      setTaskTypes(taskTypeData);
    }

    if (loggedUser) {
      getTaskTypeData();
    }
  }, [haveTaskTypesChanged]);

  const haveActivityReportsChanged = useCompareArrayOfObjects(activityReports);

  useEffect(() => {
    async function getActivityReports() {
      const activityReportsData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport`,
        toastRef
      );

      setActivityReports(activityReportsData);
    }

    if (loggedUser) {
      getActivityReports();
    }
  }, [haveActivityReportsChanged]);

  const showNavigation =
    global.pageRoute === "/login" ||
    global.pageRoute.startsWith("/resetPassword/")
      ? false
      : true;

  return (
    <>
      <LoggedUserContext.Provider
        value={{ loggedUser: memoizedLoggedUser, setLoggedUser }}
      >
        <NotificationContext.Provider
          value={{ notifications, setNotifications }}
        >
          <UsersContext.Provider
            value={{ users, setUsers, emptyUser, user, setUser }}
          >
            <ProjectsContext.Provider
              value={{
                projects,
                setProjects,
                emptyProject,
                project,
                setProject,
              }}
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
                <RolesContext.Provider
                  value={{ roles, setRoles, emptyRole, role, setRole }}
                >
                  <RolesProjectsContext.Provider
                    value={{
                      rolesProjects,
                      setRolesProjects,
                      emptyRoleProject,
                      roleProject,
                      setRoleProject,
                    }}
                  >
                    <UsersProjectsRolesContext.Provider
                      value={{
                        usersProjectsRoles,
                        setUsersProjectsRoles,
                        emptyUsersProjectsRoles,
                        userProjectRole,
                        setUserProjectRole,
                      }}
                    >
                      <PeriodsContext.Provider
                        value={{
                          periods,
                          setPeriods,
                          emptyPeriod,
                          period,
                          setPeriod,
                        }}
                      >
                        <TaskTypesContext.Provider
                          value={{
                            taskTypes,
                            setTaskTypes,
                            emptyTaskType,
                            taskType,
                            setTaskType,
                          }}
                        >
                          <ActivityReportsContext.Provider
                            value={{
                              activityReports,
                              setActivityReports,
                              emptyActivityReport,
                              activityReport,
                              setActivityReport,
                            }}
                          >
                            {showNavigation && (
                              <>
                                <Navbar />
                                <Sidebar />
                              </>
                            )}
                            <Component {...pageProps} />
                          </ActivityReportsContext.Provider>
                        </TaskTypesContext.Provider>
                      </PeriodsContext.Provider>
                    </UsersProjectsRolesContext.Provider>
                  </RolesProjectsContext.Provider>
                </RolesContext.Provider>
              </DepartmentsContext.Provider>
            </ProjectsContext.Provider>
          </UsersContext.Provider>
        </NotificationContext.Provider>
      </LoggedUserContext.Provider>
      <Toast ref={toastRef} />
    </>
  );
}
