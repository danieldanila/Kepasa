import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

export default function DataTableToolbar({ dataTableRef }) {
  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
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

  return (
    <>
      <Toolbar start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
    </>
  );
}
