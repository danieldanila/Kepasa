import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHeader from "./DataTableHeader";

export default function DataTableList({
  databaseData,
  columns,
  customInitialFilters,
}) {
  const [data, setData] = useState(databaseData);
  const [filters, setFilters] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const dataTableRef = useRef(null);

  const initialFilters = () => {
    setFilters(
      Object.assign(
        {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        },
        customInitialFilters
      )
    );
  };

  useEffect(() => {
    initialFilters();
  }, []);

  const clearFilters = () => {
    initialFilters();
    setSelectedData(null);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let filtersCopy = { ...filters };

    filtersCopy["global"].value = value;
    setFilters(filtersCopy);
  };

  const onRowEditComplete = (e) => {
    let dataCopy = [...data];
    let { newData, index } = e;
    dataCopy[index] = newData;
    setData(dataCopy);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  return (
    <>
      <DataTableToolbar dataTableRef={dataTableRef} />
      <DataTable
        ref={dataTableRef}
        showGridlines
        value={data}
        removableSort
        paginator
        rows={25}
        rowsPerPageOptions={[5, 25, 50, 75, 100]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        dataKey="id"
        header={
          <DataTableHeader
            clearFilters={clearFilters}
            customOnChange={onGlobalFilterChange}
          />
        }
        filters={filters}
        filterDisplay="menu"
        emptyMessage={`No ${global.currentPage} found`}
        selectionMode="multiple"
        dragSelection
        selection={selectedData}
        onSelectionChange={(e) => setSelectedData(e.value)}
        selectionPageOnly
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        scrollable
        scrollHeight="50rem"
      >
        <Column selectionMode="multiple" />
        {columns.map((column) => (
          <Column
            sortable
            filter
            filterPlaceholder={`Search by ${column.header}`}
            key={column.field}
            field={column.field}
            header={column.header}
            editor={(options) => textEditor(options)}
          />
        ))}
        <Column rowEditor />
      </DataTable>
    </>
  );
}
