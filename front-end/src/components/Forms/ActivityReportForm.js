import { Dialog } from "primereact/dialog";
import styles from "../../styles/PeopleForm.module.css";
import {
  ActivityReportsContext,
  LoggedUserContext,
  TaskTypesContext,
} from "@/pages/_app";
import { useContext, useEffect, useRef, useState } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import onInputDropdownChange from "@/onInputChanges/onInputDropdownChange";
import InputTextareaForm from "./FormsInput/InputTextareaForm";
import DropdownForm from "./FormsInput/DropdownForm";
import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";
import InputNumberForm from "./FormsInput/InputNumberForm";
import onInputNumberChange from "@/onInputChanges/onInputNumberChange";

export default function ActivityReportForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const toastRef = useRef(null);
  const { loggedUser } = useContext(LoggedUserContext);
  const { activityReport, setActivityReport } = useContext(
    ActivityReportsContext
  );

  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    async function getUserPorjects() {
      const userProjectsData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${loggedUser.id}/project`,
        toastRef
      );

      setUserProjects(userProjectsData);
    }

    if (loggedUser) {
      getUserPorjects();
    }
  }, [loggedUser]);

  const { taskTypes } = useContext(TaskTypesContext);

  return (
    <>
      <Dialog
        className={styles.container}
        visible={visible}
        onHide={onHide}
        dismissableMask
        header="Activity Report details"
        footer={dialogFooter}
        blockScroll
      >
        <div className={styles.inputContainer}>
          {userProjects.length > 0 && (
            <DropdownForm
              id="idProject"
              label="Project"
              suggestions={userProjects}
              fieldNameToBeShown="name"
              customOnChange={onInputDropdownChange}
              initialValue={dataEntity.Project.name}
              objectState={activityReport}
              setObjectState={setActivityReport}
            />
          )}
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
          <InputNumberForm
            id="investedTime"
            label="Invested Time"
            customOnChange={onInputNumberChange}
            initialValue={dataEntity.investedTime}
            objectState={activityReport}
            setObjectState={setActivityReport}
          />
        </div>
      </Dialog>
      <Toast ref={toastRef} />
    </>
  );
}
