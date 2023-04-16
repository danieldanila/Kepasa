import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import SearchBar from "./SearchBar";
import styles from "../styles/DataTableList.module.css";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";

export default function DataTableList({ data, columns, customInitialFilters }) {
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

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          // onClick={newData}
        />
        <Button
          type="button"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        type="button"
        label="Export to CSV"
        icon="pi pi-upload"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
    );
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

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
  };

  const dataTableHeader = (
    <div className={styles.headerContainer}>
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear filters"
        outlined
        onClick={clearFilters}
      />

      <SearchBar
        items={[]}
        losesFocus={false}
        placeHolder={`Search ${global.currentPage}`}
        customOnChange={onGlobalFilterChange}
      />
    </div>
  );

  return (
    <>
      <Toolbar start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
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
        header={dataTableHeader}
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
