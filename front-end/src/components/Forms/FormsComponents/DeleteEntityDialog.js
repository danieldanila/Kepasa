import { catchAxios } from "@/axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function DeleteEntityDialog({
  selectedDataEntity,
  setSelectedDataEntity,
  emptyDataEntity,
  setData,
  deleteSelectedDataEntityDialog,
  setDeleteSelectedDataEntityDialog,
  isCompositeKey,
  data,
  dataName,
  selectedDataEntities,
  setSelectedDataEntities,
  deleteSelectedDataEntitiesDialog,
  setDeleteSelectedDataEntitiesDialog,
}) {
  const toastRef = useRef(null);

  const deleteSelectedDataEntity = (dataEntity) => {
    async function deleteRequest() {
      let url;
      if (isCompositeKey) {
        const idParts = dataEntity.id.split(":");
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${firstKeyName}/${idParts[0]}/${secondKeyName}/${idParts[1]}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${dataEntity.id}`;
      }

      const responseOk = await catchAxios("DELETE", url, toastRef);

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

  const hideDeleteSelectedDataEntityDialog = () => {
    setDeleteSelectedDataEntityDialog(false);
  };

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

  const hideDeleteSelectedDataEntitiesDialog = () => {
    setDeleteSelectedDataEntitiesDialog(false);
  };

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

  return (
    <>
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
      <Toast ref={toastRef} />
    </>
  );
}
