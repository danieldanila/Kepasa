import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, UsersContext } from "../_app";
import PeopleForm from "@/components/Forms/PeopleForm";
import Loading from "@/components/Loading";
import { useContext } from "react";

export default function People() {
  const { loggedUser } = useContext(LoggedUserContext);

  const peopleColumns = [
    {
      field: "fullName",
      header: "Full Name",
    },
    {
      field: "Department.name",
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
      field: "mentor.fullName",
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

  const peopleInitialFilters = {
    fullName: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    departmentName: {
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
    birthday: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mentorName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    isActive: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    isAdministrator: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">People</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={UsersContext}
            columns={peopleColumns}
            customInitialFilters={peopleInitialFilters}
            dataName="user"
            DataForm={PeopleForm}
            pageName="people"
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
