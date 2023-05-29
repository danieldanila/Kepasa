import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import { ProjectsContext } from "@/pages/_app";
import { useContext } from "react";

export default function ProjectForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { project, setProject } = useContext(ProjectsContext);

  const onInputTextChange = (e, idName) => {
    const inputValue = (e.target && e.target.value) || "";
    let projectCopy = { ...project };
    projectCopy[`${idName}`] = inputValue;
    setProject(projectCopy);
  };

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Project details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="name"
          label="Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.name}
        />
      </div>
    </Dialog>
  );
}
