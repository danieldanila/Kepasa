import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import { DepartmentsContext } from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";

export default function ProjectForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { department, setDepartment } = useContext(DepartmentsContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Department details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="name"
          label="Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.name}
          objectState={department}
          setObjectState={setDepartment}
        />
      </div>
    </Dialog>
  );
}
