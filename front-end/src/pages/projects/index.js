import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { ProjectsContext } from "../_app";
import ProjectForm from "@/components/Forms/ProjectForm";

export async function getServerSideProps({ req }) {
  const { jwt } = req.cookies;

  if (!jwt) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: { jwt } };
}

export default function Projects() {
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
    <main>
      <h2 className="pageTitle">Projects</h2>
      <DataTableWrapper
        dataContext={ProjectsContext}
        columns={projectsColumn}
        customInitialFilters={projectInitialFilters}
        dataName="project"
        DataForm={ProjectForm}
      />
    </main>
  );
}
