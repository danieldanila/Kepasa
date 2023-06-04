import { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import styles from "../styles/DataTableWrapper.module.css";
import { v4 as uuid } from "uuid";
import SearchBar from "./SearchBar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { catchAxios } from "@/axios";
import infoToast from "@/toasts/infoToast";

export default function DataTableWrapper({
  dataContext,
  columns,
  customInitialFilters,
  dataName,
  DataForm,
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
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedDataEntities, setSelectedDataEntities] = useState(null);
  const [selectedDataEntity, setSelectedDataEntity] = useState(null);
  const [deleteSelectedDataEntityDialog, setDeleteSelectedDataEntityDialog] =
    useState(false);
  const [
    deleteSelectedDataEntitiesDialog,
    setDeleteSelectedDataEntitiesDialog,
  ] = useState(false);
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

  const openFormDialog = () => {
    setIsUpdate(false);
    setShowformDialog(true);
  };

  const openEditFormDialog = (rowData) => {
    setSelectedDataEntity(rowData);
    setDataEntity(rowData);
    setIsUpdate(true);
    setShowformDialog(true);
  };

  const confirmDeleteSelectedDataEntity = (rowData) => {
    setSelectedDataEntity(rowData);
    setDeleteSelectedDataEntityDialog(true);
  };

  const confirmDeleteSelectedDataEntities = () => {
    setDeleteSelectedDataEntitiesDialog(true);
  };

  const closeFormDialog = () => {
    setShowformDialog(false);
    setDataEntity(emptyDataEntity);
  };

  const hideDeleteSelectedDataEntityDialog = () => {
    setDeleteSelectedDataEntityDialog(false);
  };

  const hideDeleteSelectedDataEntitiesDialog = () => {
    setDeleteSelectedDataEntitiesDialog(false);
  };

  const saveFormDialog = () => {
    async function postData() {
      let url;
      let method;
      let dataBody;
      let index;

      if (isUpdate) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${dataEntity.id}`;
        method = "PUT";

        index = data.findIndex((item) => item.id === selectedDataEntity.id);

        const modifiedFields = Object.keys(dataEntity).filter((key) => {
          return dataEntity[key] !== selectedDataEntity[key];
        });

        const modifiedData = {};

        modifiedFields.forEach((field) => {
          modifiedData[field] = dataEntity[field];
        });

        dataBody = modifiedData;
      } else {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/create`;
        method = "POST";

        const id = uuid();
        dataEntity.id = id;

        dataBody = dataEntity;
      }

      const responseOk = await catchAxios(method, url, toastRef, dataBody);

      if (responseOk) {
        let dataCopy = [...data];

        if (isUpdate) {
          dataCopy[index] = { ...dataCopy[index], ...dataBody };
        } else {
          dataCopy.push(dataBody);
        }

        setData(dataCopy);

        closeFormDialog();
      }
    }

    postData();
  };

  const deleteSelectedDataEntity = (dataEntity) => {
    async function deleteRequest() {
      const responseOk = await catchAxios(
        "DELETE",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${dataEntity.id}`,
        toastRef
      );

      if (responseOk) {
        let dataCopy = data.filter((item) => item.id !== dataEntity.id);

        setData(dataCopy);
        setSelectedDataEntity(emptyDataEntity);
      }
      setDeleteSelectedDataEntityDialog(false);
    }
    deleteRequest();
  };

  const deleteSelectedDataEntities = () => {
    for (const dataEntity of selectedDataEntities) {
      deleteSelectedDataEntity(dataEntity);
    }
    setDeleteSelectedDataEntitiesDialog(false);
    setSelectedDataEntities(null);
  };

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
    infoToast(toastRef, "The data has been exported to a .csv file");
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

  const deleteSelectedDataEntitytDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteSelectedDataEntityDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => deleteSelectedDataEntity(selectedDataEntity)}
      />
    </>
  );

  const deleteSelectedDataEntitiesDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteSelectedDataEntitiesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedDataEntities}
      />
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
          onClick={confirmDeleteSelectedDataEntities}
          disabled={!selectedDataEntities || !selectedDataEntities.length}
        />
        <Toast ref={toastRef} />
        {openFormDialog && (
          <DataForm
            visible={showFormDialog}
            onHide={closeFormDialog}
            dialogFooter={dialogFooter}
            isUpdate={isUpdate}
            dataEntity={dataEntity}
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionBodyTemplaContainer}>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          onClick={() => openEditFormDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteSelectedDataEntity(rowData)}
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
        dragSelection
        selection={selectedDataEntities}
        onSelectionChange={(e) => setSelectedDataEntities(e.value)}
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
        <Column body={actionBodyTemplate} exportable={false}></Column>
      </DataTable>
      <Dialog
        visible={deleteSelectedDataEntityDialog}
        onHide={hideDeleteSelectedDataEntityDialog}
        header="Confirm"
        modal
        footer={deleteSelectedDataEntitytDialogFooter}
      >
        {selectedDataEntity && (
          <span>
            Are you sure you want to delete{" "}
            <strong>
              {selectedDataEntity.name
                ? selectedDataEntity.name
                : selectedDataEntity.fullName}
            </strong>
            ?
          </span>
        )}
      </Dialog>
      <Dialog
        visible={deleteSelectedDataEntitiesDialog}
        header="Confirm"
        modal
        footer={deleteSelectedDataEntitiesDialogFooter}
        onHide={hideDeleteSelectedDataEntitiesDialog}
      >
        {selectedDataEntities && (
          <span>
            Are you sure you want to delete the {selectedDataEntities.length}{" "}
            selected data?
          </span>
        )}
      </Dialog>
    </>
  );
}
