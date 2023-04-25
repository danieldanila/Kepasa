import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { UsersContext } from "../_app";

export default function People() {
  const peopleColumns = [
    {
      field: "fullName",
      header: "Full Name",
    },
    {
      field: "department",
      header: "Department",
    },
    {
      field: "role",
      header: "Role",
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
  ];

  const peopleInitialFilters = {
    fullName: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    department: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    role: {
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
