import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import WarningDialog from "./WarningDialog";

export default function DeleteEntityDialog({
  selectedDataEntity,
  setSelectedDataEntity,
  emptyDataEntity,
  setData,
  deleteSelectedDataEntityDialog,
  setDeleteSelectedDataEntityDialog,
  isCompositeKey,
  firstKeyName,
  secondKeyName,
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

  const hideDeleteSelectedDataEntitiesDialog = () => {
    setDeleteSelectedDataEntitiesDialog(false);
  };

  return (
    <>
      <WarningDialog
        visible={deleteSelectedDataEntityDialog}
        onHide={hideDeleteSelectedDataEntityDialog}
        warningMessage={`Are you sure you want to delete  
        ${
          selectedDataEntity &&
          (selectedDataEntity.name
            ? selectedDataEntity.name
            : selectedDataEntity.fullName || "the data")
        }?`}
        exitDialog={hideDeleteSelectedDataEntityDialog}
        dialogFunction={deleteSelectedDataEntity}
        dialogFunctionData={selectedDataEntity}
      />
      <WarningDialog
        visible={deleteSelectedDataEntitiesDialog}
        onHide={hideDeleteSelectedDataEntitiesDialog}
        warningMessage={`Are you sure you want to delete the ${
          selectedDataEntities && selectedDataEntities.length
        } selected data?`}
        exitDialog={hideDeleteSelectedDataEntitiesDialog}
        dialogFunction={deleteSelectedDataEntities}
      />
      <Toast ref={toastRef} />
    </>
  );
}
