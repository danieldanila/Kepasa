import { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import styles from "../styles/DataTableWrapper.module.css";
import PeopleForm from "./Forms/PeopleForm";
import { v4 as uuid } from "uuid";
import SearchBar from "./SearchBar";

export default function DataTableWrapper({
  dataContext,
  columns,
  customInitialFilters,
}) {
  const contextValues = useContext(dataContext);
  const {
    [Object.keys(contextValues)[0]]: data,
    [Object.keys(contextValues)[1]]: setData,
    [Object.keys(contextValues)[2]]: emptyDataEntity,
    [Object.keys(contextValues)[3]]: dataEntity,
    [Object.keys(contextValues)[4]]: setDataEntity,
  } = contextValues;

  const [filters, setFilters] = useState(null);
  const [showFormDialog, setShowformDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    console.log(dataEntity);
  }, [dataEntity, data]);

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

  const openFormDialog = () => {
    setShowformDialog(true);
  };

  const closeFormDialog = () => {
    setShowformDialog(false);
  };

  const saveFormDialog = () => {
    const uniqueId = uuid();
    let dataEntityCopy = { ...dataEntity };
    dataEntityCopy["id"] = uniqueId;
    setDataEntity(dataEntityCopy);

    let dataCopy = [...data];

    dataCopy.push(dataEntity);

    setData(dataCopy);

    setShowformDialog(false);
  };

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
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

  const dialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={closeFormDialog}
      ></Button>
      <Button label="Save" icon="pi pi-check" onClick={saveFormDialog}></Button>
    </>
  );

  const leftToolbarTemplate = () => {
    return (
      <div className={styles.leftContainer}>
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openFormDialog}
        />
        <Button
          type="button"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
        />
        {openFormDialog && (
          <PeopleForm
            visible={showFormDialog}
            onHide={closeFormDialog}
            dialogFooter={dialogFooter}
          />
        )}
      </div>
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

  const dataTableHeader = () => {
    return (
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
  };

  return (
    <>
      <Toolbar
        className={styles.container}
        start={leftToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>
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
