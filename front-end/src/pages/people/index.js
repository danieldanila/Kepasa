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
