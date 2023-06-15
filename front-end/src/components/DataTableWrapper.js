import { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import styles from "../styles/DataTableWrapper.module.css";
import SearchBar from "./SearchBar";
import { Toast } from "primereact/toast";
import infoToast from "@/toasts/infoToast";
import DeleteEntityDialog from "./Forms/FormsComponents/DeleteEntityDialog";
import FormDialog from "./Forms/FormsComponents/FormDialog";

export default function DataTableWrapper({
  loggedUser,
  dataContext,
  columns,
  customInitialFilters,
  dataName,
  DataForm,
  pageName,
  isCompositeKey,
  firstKeyName,
  secondKeyName,
  hasPersonalPage,
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
  const [deleteSelectedDataEntityDialog, setDeleteSelectedDataEntityDialog] =
    useState(false);
  const [selectedDataEntities, setSelectedDataEntities] = useState(null);
  const [selectedDataEntity, setSelectedDataEntity] = useState(null);
  const [
    deleteSelectedDataEntitiesDialog,
    setDeleteSelectedDataEntitiesDialog,
  ] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const dataTableRef = useRef(null);
  const toastRef = useRef(null);

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
    setSelectedDataEntities(null);
    infoToast(toastRef, "The filters have been cleared");
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

  const confirmDeleteSelectedDataEntity = (rowData) => {
    setSelectedDataEntity(rowData);
    setDeleteSelectedDataEntityDialog(true);
  };

  const confirmDeleteSelectedDataEntities = () => {
    setDeleteSelectedDataEntitiesDialog(true);
  };

  const openFormDialog = () => {
    setIsUpdate(false);
    setShowFormDialog(true);
  };

  const openEditFormDialog = (rowData) => {
    setSelectedDataEntity(rowData);
    setDataEntity(rowData);
    setIsUpdate(true);
    setShowFormDialog(true);
  };

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
    infoToast(toastRef, "The data has been exported to a .csv file");
  };

  const rowDoubleClickHandler = (rowData) => {
    global.router.push(`/${pageName}/` + rowData.id);
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
          onClick={confirmDeleteSelectedDataEntities}
          disabled={!selectedDataEntities || !selectedDataEntities.length}
        />
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionBodyTemplaContainer}>
        {(loggedUser.isAdministrator || loggedUser.id === rowData.id) && (
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            onClick={() => openEditFormDialog(rowData)}
          />
        )}
        {loggedUser.isAdministrator && (
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteSelectedDataEntity(rowData)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {loggedUser.isAdministrator ? (
        <Toolbar
          className={styles.container}
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>
      ) : null}
      <DataTable
        ref={dataTableRef}
        showGridlines
        value={data}
        removableSort
        paginator
        rows={5}
        rowsPerPageOptions={[5, 25, 50, 75, 100]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        dataKey="id"
        header={dataTableHeader}
        filters={filters}
        filterDisplay="menu"
        emptyMessage={`No ${global.currentPage} found`}
        selectionMode="multiple"
        dragSelection={loggedUser.isAdministrator ? true : false}
        selection={selectedDataEntities}
        onSelectionChange={(e) => setSelectedDataEntities(e.value)}
        selectionPageOnly
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        scrollable
        scrollHeight="50rem"
        onRowDoubleClick={(e) =>
          hasPersonalPage && rowDoubleClickHandler(e.data)
        }
      >
        {loggedUser.isAdministrator ? (
          <Column selectionMode="multiple" />
        ) : null}
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
        <Column body={actionBodyTemplate} exportable={false}></Column>
      </DataTable>

      <DeleteEntityDialog
        selectedDataEntity={selectedDataEntity}
        setSelectedDataEntity={setSelectedDataEntity}
        emptyDataEntity={emptyDataEntity}
        setData={setData}
        deleteSelectedDataEntityDialog={deleteSelectedDataEntityDialog}
        setDeleteSelectedDataEntityDialog={setDeleteSelectedDataEntityDialog}
        isCompositeKey={isCompositeKey}
        firstKeyName={firstKeyName}
        secondKeyName={secondKeyName}
        data={data}
        dataName={dataName}
        selectedDataEntities={selectedDataEntities}
        setSelectedDataEntities={setSelectedDataEntities}
        deleteSelectedDataEntitiesDialog={deleteSelectedDataEntitiesDialog}
        setDeleteSelectedDataEntitiesDialog={
          setDeleteSelectedDataEntitiesDialog
        }
      />
      <FormDialog
        DataForm={DataForm}
        loggedUser={loggedUser}
        dataEntity={dataEntity}
        setDataEntity={setDataEntity}
        emptyDataEntity={emptyDataEntity}
        selectedDataEntity={selectedDataEntity}
        openFormDialog={openFormDialog}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        showFormDialog={showFormDialog}
        setShowformDialog={setShowFormDialog}
        data={data}
        setData={setData}
        dataName={dataName}
        isCompositeKey={isCompositeKey}
        firstKeyName={firstKeyName}
        secondKeyName={secondKeyName}
      />

      <Toast ref={toastRef} />
    </>
  );
}
