import { Dialog } from "primereact/dialog";
import styles from "../../styles/PeopleForm.module.css";
import {
  ProjectsContext,
  RolesContext,
  UsersContext,
  UsersProjectsRolesContext,
} from "@/pages/_app";
import { useContext } from "react";
import DropdownForm from "./FormsInput/DropdownForm";
import onInputDropdownChange from "@/onInputChanges/onInputDropdownChange";

export default function UserProjectRoleForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { roles } = useContext(RolesContext);
  const { projects } = useContext(ProjectsContext);
  const { users } = useContext(UsersContext);
  const { userProjectRole, setUserProjectRole } = useContext(
    UsersProjectsRolesContext
  );

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Users & Project & Role details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <DropdownForm
          id="idUser"
          label="User"
          suggestions={users}
          fieldNameToBeShown="fullName"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.User.fullName}
          objectState={userProjectRole}
          setObjectState={setUserProjectRole}
          readOnly={isUpdate && true}
        />
        <DropdownForm
          id="idProject"
          label="Project"
          suggestions={projects}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Project.name}
          objectState={userProjectRole}
          setObjectState={setUserProjectRole}
          readOnly={isUpdate && true}
        />
        <DropdownForm
          id="idRole"
          label="Role"
          suggestions={roles}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Role.name}
          objectState={userProjectRole}
          setObjectState={setUserProjectRole}
        />
      </div>
    </Dialog>
  );
}
