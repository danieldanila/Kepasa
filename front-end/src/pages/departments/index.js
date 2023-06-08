import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, DepartmentsContext } from "../_app";
import DepartmentForm from "@/components/Forms/DepartmentForm";
import { useContext } from "react";
import Loading from "@/components/Loading";

export default function Departments() {
  const { loggedUser } = useContext(LoggedUserContext);

  const departmentsColumn = [
    {
      field: "name",
      header: "Name",
    },
  ];

  const departmentInitialFilters = {
    name: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Departments</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={DepartmentsContext}
            columns={departmentsColumn}
            customInitialFilters={departmentInitialFilters}
            dataName="department"
            DataForm={DepartmentForm}
            pageName="departments"
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
