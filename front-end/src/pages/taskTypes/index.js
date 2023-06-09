import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, TaskTypesContext } from "../_app";
import { useContext } from "react";
import Loading from "@/components/Loading";
import TaskTypeForm from "@/components/Forms/TaskTypeForm";

export default function TaskTypes() {
  const { loggedUser } = useContext(LoggedUserContext);

  const taskTypesColumn = [
    {
      field: "name",
      header: "Name",
    },
  ];

  const taskTypesInitialFilters = {
    name: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Task Types</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={TaskTypesContext}
            columns={taskTypesColumn}
            customInitialFilters={taskTypesInitialFilters}
            dataName="taskType"
            DataForm={TaskTypeForm}
            pageName="taskTypes"
            hasPersonalPage={false}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
