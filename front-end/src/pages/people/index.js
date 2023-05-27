import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { UsersContext } from "../_app";
import { useContext, useEffect } from "react";

export default function People() {
  const peopleColumns = [
    {
      field: "fullName",
      header: "Full Name",
    },
    {
      field: "departmentName",
      header: "Department",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "phone",
      header: "Phone",
    },
    {
      field: "socialMediaLink",
      header: "Social Media Link",
    },
    {
      field: "birthday",
      header: "Birthday",
    },
    {
      field: "mentorName",
      header: "Mentor",
    },
    {
      field: "isActive",
      header: "Active",
    },
    {
      field: "isAdministrator",
      header: "Admin",
    },
  ];

  const { users, setUsers } = useContext(UsersContext);

  useEffect(() => {
    const filteredUsers = [];

    async function filterUserData() {
      for (const user of users) {
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

    filterUserData();
  }, []);

  const peopleInitialFilters = {
    fullName: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    departmentName: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    departmentRoleName: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    socialMediaLink: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <main>
      <h2 className="pageTitle">People</h2>
      <DataTableWrapper
        dataContext={UsersContext}
        columns={peopleColumns}
        customInitialFilters={peopleInitialFilters}
      />
    </main>
  );
}
