import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, RolesProjectsContext } from "../_app";
import RoleProjectForm from "@/components/Forms/RoleProjectForm";
import { useContext } from "react";
import Loading from "@/components/Loading";

export default function RolesProjects() {
  const { loggedUser } = useContext(LoggedUserContext);

  const rolesProjectsColumn = [
    {
      field: "Role.name",
      header: "Role name",
    },
    {
      field: "Project.name",
      header: "Project name",
    },
    {
      field: "hourlyPay",
      header: "Hourly Pay",
    },
  ];

  const rolesProjectsInitialFilters = {
    "Role.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Project.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    hourlyPay: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Roles & Projects</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={RolesProjectsContext}
            columns={rolesProjectsColumn}
            customInitialFilters={rolesProjectsInitialFilters}
            dataName="rolesProjects"
            DataForm={RoleProjectForm}
            pageName="rolesProjects"
            isCompositeKey={true}
            firstKeyName="role"
            secondKeyName="project"
            hasPersonalPage={false}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
