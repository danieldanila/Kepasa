import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import CalendarForm from "./FormsInput/CalendarForm";
import DropdownForm from "./FormsInput/DropdownForm";
import PasswordForm from "./FormsInput/PasswordForm";
import ToggleButtonForm from "./FormsInput/ToggleButtonForm";
import styles from "../../styles/PeopleForm.module.css";
import { UsersContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";

export default function PeopleForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  person,
}) {
  const [departments, setDepartments] = useState(null);
  const { users, user, setUser } = useContext(UsersContext);

  useEffect(() => {
    async function getDepartments() {
      const departmentsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department/`
      );
      const departments = await departmentsResponse.json();

      setDepartments(departments);
    }

    getDepartments();
  }, []);

  const onInputTextChange = (e, idName) => {
    const inputValue = (e.target && e.target.value) || "";
    let userCopy = { ...user };
    userCopy[`${idName}`] = inputValue;
    setUser(userCopy);
  };

  const onInputBooleanChange = (e, idName) => {
    let userCopy = { ...user };
    userCopy[`${idName}`] = e.value.toString();
    setUser(userCopy);
  };

  const onInputDropdownChange = (e, idName) => {
    let inputValue = (e.target && e.target.value) || "";
    let userCopy = { ...user };

    userCopy[`${idName}`] = inputValue.id;
    setUser(userCopy);
  };

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
          initialValue={person.firstName}
        />
        <InputTextForm
          id="lastName"
          label="Last Name"
          customOnChange={onInputTextChange}
          initialValue={person.lastName}
        />
        <InputTextForm
          id="email"
          label="Email"
          keyfilter="email"
          customOnChange={onInputTextChange}
          initialValue={person.email}
        />
        <InputTextForm
          id="phone"
          label="Phone"
          keyfilter="pint"
          customOnChange={onInputTextChange}
          initialValue={person.phone}
        />
        <CalendarForm
          id="birthday"
          label="Birthday"
          customOnChange={onInputTextChange}
          initialValue={person.birthday}
        />
        <InputTextForm
          id="socialMediaLink"
          label="Social Media Link"
          customOnChange={onInputTextChange}
          initialValue={person.socialMediaLink}
        />
        <DropdownForm
          id="idDepartment"
          label="Department"
          suggestions={departments}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
          initialValue={person.departmentName}
        />
        <DropdownForm
          id="idMentor"
          label="Mentor"
          suggestions={users}
          fieldNameToBeShown="fullName"
          customOnChange={onInputDropdownChange}
          initialValue={person.mentorName}
        />
        {isUpdate ? (
          <ToggleButtonForm
            id="isActive"
            onLabel="Is Active"
            offLabel="Is NOT Active"
            customOnChange={onInputBooleanChange}
            initialValue={person.isActive}
          />
        ) : (
          <PasswordForm
            id="password"
            label="Initial password"
            customOnChange={onInputTextChange}
          />
        )}

        <ToggleButtonForm
          id="isAdministrator"
          onLabel="Is Administrator"
          offLabel="Is NOT Administrator"
          customOnChange={onInputBooleanChange}
          initialValue={person.isAdministrator}
        />
      </div>
    </Dialog>
  );
}
