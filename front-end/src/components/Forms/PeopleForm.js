import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import CalendarForm from "./FormsInput/CalendarForm";
import DropdownForm from "./FormsInput/DropdownForm";
import PasswordForm from "./FormsInput/PasswordForm";
import ToggleButtonForm from "./FormsInput/ToggleButtonForm";
import styles from "../../styles/PeopleForm.module.css";
import { DepartmentsContext, UsersContext } from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import onInputDropdownChange from "../../onInputChanges/onInputDropdownChange";
import onInputBooleanChange from "../../onInputChanges/onInputBooleanChange";

export default function PeopleForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { departments } = useContext(DepartmentsContext);
  const { users, user, setUser } = useContext(UsersContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Person details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="firstName"
          label="First Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.firstName}
          objectState={user}
          setObjectState={setUser}
        />
        <InputTextForm
          id="lastName"
          label="Last Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.lastName}
          objectState={user}
          setObjectState={setUser}
        />
        <InputTextForm
          id="email"
          label="Email"
          keyfilter="email"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.email}
          objectState={user}
          setObjectState={setUser}
        />
        <InputTextForm
          id="phone"
          label="Phone"
          keyfilter="pint"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.phone}
          objectState={user}
          setObjectState={setUser}
        />
        <CalendarForm
          id="birthday"
          label="Birthday"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.birthday}
          objectState={user}
          setObjectState={setUser}
        />
        <InputTextForm
          id="socialMediaLink"
          label="Social Media Link"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.socialMediaLink}
          objectState={user}
          setObjectState={setUser}
        />
        <DropdownForm
          id="idDepartment"
          label="Department"
          suggestions={departments}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.Department.name}
          objectState={user}
          setObjectState={setUser}
        />
        <DropdownForm
          id="idMentor"
          label="Mentor"
          suggestions={users}
          fieldNameToBeShown="fullName"
          customOnChange={onInputDropdownChange}
          initialValue={dataEntity.mentor ? dataEntity.mentor.fullName : ""}
          objectState={user}
          setObjectState={setUser}
        />
        {isUpdate ? (
          <ToggleButtonForm
            id="isActive"
            onLabel="Is Active"
            offLabel="Is NOT Active"
            customOnChange={onInputBooleanChange}
            initialValue={dataEntity.isActive}
            objectState={user}
            setObjectState={setUser}
          />
        ) : (
          <PasswordForm
            id="password"
            label="Initial password"
            customOnChange={onInputTextChange}
            objectState={user}
            setObjectState={setUser}
            feedbackValue={true}
          />
        )}

        <ToggleButtonForm
          id="isAdministrator"
          onLabel="Is Administrator"
          offLabel="Is NOT Administrator"
          customOnChange={onInputBooleanChange}
          initialValue={dataEntity.isAdministrator}
          objectState={user}
          setObjectState={setUser}
        />
      </div>
    </Dialog>
  );
}
