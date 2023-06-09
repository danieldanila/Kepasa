import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import { DepartmentsContext, RolesContext } from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import DropdownForm from "./FormsInput/DropdownForm";
import onInputDropdownChange from "@/onInputChanges/onInputDropdownChange";

export default function RoleForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { roles, role, setRole } = useContext(RolesContext);
  const { departments } = useContext(DepartmentsContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Role details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="name"
          label="Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.name}
          objectState={role}
          setObjectState={setRole}
        />
        <DropdownForm
          id="idDepartment"
          label="Department"
          suggestions={departments}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Department.name}
          objectState={role}
          setObjectState={setRole}
        />
        <DropdownForm
          id="idSuperiorRole"
          label="Superior Role"
          suggestions={roles}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={
            dataEntity.superiorRole ? dataEntity.superiorRole.name : ""
          }
          objectState={role}
          setObjectState={setRole}
        />
      </div>
    </Dialog>
  );
}
