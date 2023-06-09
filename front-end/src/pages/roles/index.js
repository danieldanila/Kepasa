import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, RolesContext } from "../_app";
import { useContext } from "react";
import Loading from "@/components/Loading";
import RoleForm from "@/components/Forms/RoleForm";

export default function Roles() {
  const { loggedUser } = useContext(LoggedUserContext);

  const rolesColumn = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "Department.name",
      header: "Department",
    },
    {
      field: "superiorRole.name",
      header: "Superior Role",
    },
  ];

  const roleInitialFilters = {
    name: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Department.name": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "superiorRole.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Roles</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={RolesContext}
            columns={rolesColumn}
            customInitialFilters={roleInitialFilters}
            dataName="role"
            DataForm={RoleForm}
            pageName="roles"
            hasPersonalPage={true}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
