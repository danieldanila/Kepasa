import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import {
  ActivityReportsContext,
  ProjectsContext,
  TaskTypesContext,
} from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import onInputDropdownChange from "@/onInputChanges/onInputDropdownChange";
import InputTextareaForm from "./FormsInput/InputTextareaForm";

export default function ActivityReportorm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { activityReport, setActivityReport } = useContext(
    ActivityReportsContext
  );
  const { projects } = useContext(ProjectsContext);
  const { taskTypes } = useContext(TaskTypesContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="ActivityReport details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <DropdownForm
          id="idProject"
          label="Project"
          suggestions={projects}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Project.name}
          objectState={activityReport}
          setObjectState={setActivityReport}
        />
        <DropdownForm
          id="idTaskType"
          label="Task Type"
          suggestions={taskTypes}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.TaskType.name}
          objectState={activityReport}
          setObjectState={setActivityReport}
        />
        <InputTextareaForm
          id="description"
          label="Description"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.description}
          objectState={activityReport}
          setObjectState={setActivityReport}
        />
        <InputTextForm
          id="investedTime"
          label="Invested Time"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.investedTime}
          objectState={activityReport}
          setObjectState={setActivityReport}
        />
      </div>
    </Dialog>
  );
}
