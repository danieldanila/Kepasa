import Section from "@/components/Section";
import { DepartmentsContext, ProjectsContext, UsersContext } from "./_app";
import { useContext, useEffect } from "react";
import useCompareArrayOfObjects from "@/hooks/useCompare";
import { catchAxios } from "@/axios";

export default function Home() {
  const { users, setUsers } = useContext(UsersContext);
  const { projects, setProjects } = useContext(ProjectsContext);
  const { departments, setDepartments } = useContext(DepartmentsContext);

  const haveUsersChanged = useCompareArrayOfObjects(users);

  useEffect(() => {
    async function getUserData() {
      const usersData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`
      );

      const filteredUsers = [];

      for (const user of usersData) {
        const userDepartment = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/department`
        );

        const userMentor = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${user.id}/mentor`
        );

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

  const haveProjectsChanged = useCompareArrayOfObjects(projects);

  useEffect(() => {
    async function getProjectData() {
      const projectsData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project`
      );

      setProjects(projectsData);
    }

    getProjectData();
  }, [haveProjectsChanged]);

  const haveDepartmentsChanged = useCompareArrayOfObjects(departments);

  useEffect(() => {
    async function getDepartmentData() {
      const departmentData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department`
      );

      setDepartments(departmentData);
    }

    getDepartmentData();
  }, [haveDepartmentsChanged]);

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
        Hi Daniel-Marian Dănilă, glad you're here 👋
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
