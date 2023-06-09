import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, ProjectsContext } from "../_app";
import ProjectForm from "@/components/Forms/ProjectForm";
import { useContext } from "react";
import Loading from "@/components/Loading";

export default function Projects() {
  const { loggedUser } = useContext(LoggedUserContext);

  const projectsColumn = [
    {
      field: "name",
      header: "Name",
    },
  ];

  const projectInitialFilters = {
    name: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Projects</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={ProjectsContext}
            columns={projectsColumn}
            customInitialFilters={projectInitialFilters}
            dataName="project"
            DataForm={ProjectForm}
            pageName="projects"
            hasPersonalPage={true}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
