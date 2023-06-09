import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, UsersProjectsRolesContext } from "../_app";
import { useContext } from "react";
import Loading from "@/components/Loading";
import UserProjectRoleForm from "@/components/Forms/UsersProjectsRolesForm";

export default function UsersProjectsRoles() {
  const { loggedUser } = useContext(LoggedUserContext);

  const usersProjectsRolesColumn = [
    {
      field: "User.fullName",
      header: "User",
    },
    {
      field: "Project.name",
      header: "Project",
    },
    {
      field: "Role.name",
      header: "Role",
    },
  ];

  const usersProjectsRolesInitialFilters = {
    "User.fullName": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Role.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Project.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Users & Projects & Roles</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={UsersProjectsRolesContext}
            columns={usersProjectsRolesColumn}
            customInitialFilters={usersProjectsRolesInitialFilters}
            dataName="usersProjectsRoles"
            DataForm={UserProjectRoleForm}
            pageName="usersProjectsRoles"
            isCompositeKey={true}
            firstKeyName="user"
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
