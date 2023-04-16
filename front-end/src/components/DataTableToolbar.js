import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import styles from "../styles/DataTableToolbar.module.css";
import PeopleForm from "./Forms/PeopleForm";
import { useState } from "react";

export default function DataTableToolbar({ dataTableRef }) {
  const [showFormDialog, setShowformDialog] = useState(false);

  const openFormDialog = () => {
    setShowformDialog(true);
  };

  const closeFormDialog = () => {
    setShowformDialog(false);
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
        />
        {openFormDialog && (
          <PeopleForm visible={showFormDialog} onHide={closeFormDialog} />
        )}
      </div>
    );
  };

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
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

  return (
    <div className={styles.container}>
      <Toolbar start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
    </div>
  );
}
