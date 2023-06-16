import { useContext } from "react";
import { LoggedUserContext, ActivityReportsContext } from "../../pages/_app";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "../DataTableWrapper";
import ActivityReportForm from "../Forms/ActivityReportForm";

export default function ActivityReports({}) {
  const { loggedUser } = useContext(LoggedUserContext);

  const activityReportColumn = [
    {
      field: "Period.name",
      header: "Period",
    },
    {
      field: "date",
      header: "Date",
    },
    {
      field: "User.fullName",
      header: "User",
    },
    {
      field: "Project.name",
      header: "Project",
    },
    {
      field: "TaskType.name",
      header: "Task Type",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "investedTime",
      header: "Invested Time",
    },
    {
      field: "isSent",
      header: "Is Sent",
    },
    {
      field: "isApproved",
      header: "Is Approved",
    },
    {
      field: "rejectJustification",
      header: "Reject Justification",
    },
    {
      field: "Approver.fullName",
      header: "Approver",
    },
  ];

  const activityReportInitialFilters = {
    "Period.name": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    date: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "User.fullName": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Project.name": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "TaskType.name": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    description: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    investedTime: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    isSent: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    isApproved: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    rejectJustification: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    "Approver.fullName": {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={ActivityReportsContext}
            columns={activityReportColumn}
            customInitialFilters={activityReportInitialFilters}
            dataName="project"
            DataForm={ActivityReportForm}
            pageName="projects"
            hasPersonalPage={false}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
