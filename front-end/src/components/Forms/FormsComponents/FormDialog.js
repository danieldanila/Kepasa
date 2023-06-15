import { catchAxios } from "@/axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

export default function FormDialog({
  DataForm,
  loggedUser,
  dataEntity,
  setDataEntity,
  emptyDataEntity,
  selectedDataEntity,
  openFormDialog,
  isUpdate,
  setIsUpdate,
  showFormDialog,
  setShowformDialog,
  data,
  setData,
  dataName,
  isCompositeKey,
  firstKeyName,
  secondKeyName,
}) {
  const toastRef = useRef(null);

  const closeFormDialog = () => {
    setShowformDialog(false);
    setIsUpdate(false);
    setDataEntity(emptyDataEntity);
  };

  const saveFormDialog = () => {
    async function postData() {
      let url;
      let method;
      let dataBody;
      let index;

      if (isUpdate) {
        if (loggedUser && dataEntity.id === loggedUser.id) {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/updateMe`;
          method = "PATCH";
        } else {
          if (isCompositeKey) {
            const idParts = dataEntity.id.split(":");
            url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${firstKeyName}/${idParts[0]}/${secondKeyName}/${idParts[1]}`;
          } else {
            url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${dataName}/${dataEntity.id}`;
          }
          method = "PUT";
        }

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
  return (
    <>
      {openFormDialog && (
        <DataForm
          visible={showFormDialog}
          onHide={closeFormDialog}
          dialogFooter={dialogFooter}
          isUpdate={isUpdate}
          dataEntity={dataEntity}
          loggedUser={loggedUser}
        />
      )}
      <Toast ref={toastRef} />
    </>
  );
}
