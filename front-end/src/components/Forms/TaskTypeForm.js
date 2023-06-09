import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import { TaskTypesContext } from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";

export default function TaskTypeForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { taskType, setTaskType } = useContext(TaskTypesContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Task Type details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="name"
          label="Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.name}
          objectState={taskType}
          setObjectState={setTaskType}
        />
      </div>
    </Dialog>
  );
}
