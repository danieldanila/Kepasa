import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import {
  ProjectsContext,
  RolesContext,
  RolesProjectsContext,
} from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import DropdownForm from "./FormsInput/DropdownForm";
import onInputDropdownChange from "@/onInputChanges/onInputDropdownChange";

export default function RoleProjectForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { roles } = useContext(RolesContext);
  const { projects } = useContext(ProjectsContext);
  const { roleProject, setRoleProject } = useContext(RolesProjectsContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Role & Project details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <DropdownForm
          id="idRole"
          label="Role"
          suggestions={roles}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Role.name}
          objectState={roleProject}
          setObjectState={setRoleProject}
          readOnly={isUpdate && true}
        />
        <DropdownForm
          id="idProject"
          label="Project"
          suggestions={projects}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Project.name}
          objectState={roleProject}
          setObjectState={setRoleProject}
          readOnly={isUpdate && true}
        />
        <InputTextForm
          id="hourlyPay"
          label="Hourly Pay"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.hourlyPay}
          objectState={roleProject}
          setObjectState={setRoleProject}
        />
      </div>
    </Dialog>
  );
}
