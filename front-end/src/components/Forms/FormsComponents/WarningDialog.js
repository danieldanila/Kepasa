import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function WarningDialog({
  visible,
  onHide,
  warningMessage,
  exitDialog,
  dialogFunction,
  dialogFunctionData,
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
      </Dialog>
    </>
  );
}
