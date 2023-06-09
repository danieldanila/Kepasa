import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableWrapper from "@/components/DataTableWrapper";
import { LoggedUserContext, PeriodsContext } from "../_app";
import { useContext } from "react";
import Loading from "@/components/Loading";
import PeriodForm from "@/components/Forms/PeriodForm";

export default function Periods() {
  const { loggedUser } = useContext(LoggedUserContext);

  const periodsColumn = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "startDate",
      header: "Start Date",
    },
    {
      field: "endDate",
      header: "End Date",
    },
  ];

  const periodsInitialFilters = {
    name: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    startDate: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    endDate: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    <>
      {loggedUser ? (
        <main>
          <h2 className="pageTitle">Periods</h2>
          <DataTableWrapper
            loggedUser={loggedUser}
            dataContext={PeriodsContext}
            columns={periodsColumn}
            customInitialFilters={periodsInitialFilters}
            dataName="period"
            DataForm={PeriodForm}
            pageName="periods"
            hasPersonalPage={false}
          />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
