import { Dialog } from "primereact/dialog";
import InputTextForm from "./InputTextForm";
import CalendarForm from "./CalendarForm";
import DropdownForm from "./DropdownForm";
import PasswordForm from "./PasswordForm";
import ToggleButtonForm from "./ToggleButtonForm";
import styles from "../../styles/PeopleForm.module.css";
import { UsersContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";

export default function PeopleForm({ visible, onHide, dialogFooter }) {
  const [departments, setDepartments] = useState(null);
  const [users, setUsers] = useState(null);
  const { emptyPerson, user, setUser } = useContext(UsersContext);

  useEffect(() => {
    async function getDepartments() {
      const departmentsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department/`
      );
      const departments = await departmentsResponse.json();

      setDepartments(departments);
    }

    async function getUsers() {
      const usersResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/`
      );
      const users = await usersResponse.json();

      setUsers(users);
    }

    getDepartments();
    getUsers();
  }, []);

  const onInputTextChange = (e, idName) => {
    const inputValue = (e.target && e.target.value) || "";
    let userCopy = { ...user };
    userCopy[`${idName}`] = inputValue;
    setUser(userCopy);
  };

  const onInputBooleanChange = (e, idName) => {
    let userCopy = { ...user };
    userCopy[`${idName}`] = e.value;
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
          keyfilter="alpha"
          customOnChange={onInputTextChange}
        />
        <InputTextForm
          id="lastName"
          label="Last Name"
          keyfilter="alpha"
          customOnChange={onInputTextChange}
        />
        <InputTextForm
          id="email"
          label="Email"
          keyfilter="email"
          customOnChange={onInputTextChange}
        />
        <InputTextForm
          id="phone"
          label="Phone"
          keyfilter="pint"
          customOnChange={onInputTextChange}
        />
        <CalendarForm
          id="birthday"
          label="Birthday"
          customOnChange={onInputTextChange}
        />
        <InputTextForm
          id="socialMediaLink"
          label="Social Media Link"
          customOnChange={onInputTextChange}
        />
        <DropdownForm
          id="idDepartment"
          label="Department"
          suggestions={departments}
          fieldNameToBeShown="name"
          customOnChange={onInputDropdownChange}
        />
        <DropdownForm
          id="idMentor"
          label="Mentor"
          suggestions={users}
          fieldNameToBeShown="fullName"
          customOnChange={onInputDropdownChange}
        />
        <PasswordForm
          id="password"
          label="Initial password"
          customOnChange={onInputTextChange}
        />
        <ToggleButtonForm
          id="isAdministrator"
          onLabel="Is Administrator"
          offLabel="Is NOT Administrator"
          customOnChange={onInputBooleanChange}
        />
      </div>
    </Dialog>
  );
}
