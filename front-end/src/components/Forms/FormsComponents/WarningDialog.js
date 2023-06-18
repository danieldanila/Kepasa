import onInputTextChange from "@/onInputChanges/onInputTextChange";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import InputTextForm from "../FormsInput/InputTextForm";
import styles from "../../../styles/WarningDialog.module.css";

export default function WarningDialog({
  visible,
  onHide,
  warningMessage,
  exitDialog,
  dialogFunction,
  dialogFunctionData,
  setDialogFunctionData,
}) {
  const warningDialogFooter = () => {
    return (
      <>
        <Button label="No" icon="pi pi-times" outlined onClick={exitDialog} />
        <Button
          label="Yes"
          icon="pi pi-check"
          severity="danger"
          onClick={
            dialogFunctionData
              ? () => dialogFunction(dialogFunctionData)
              : dialogFunction
          }
        />
      </>
    );
  };

  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Confirm"
        modal
        footer={warningDialogFooter}
      >
        <span>{warningMessage}</span>
        {setDialogFunctionData && (
          <div className={styles.input}>
            <InputTextForm
              id="rejectJustification"
              label="Reject Justification"
              customOnChange={onInputTextChange}
              initialValue={""}
              objectState={dialogFunctionData}
              setObjectState={setDialogFunctionData}
            />
          </div>
        )}
      </Dialog>
    </>
  );
}
