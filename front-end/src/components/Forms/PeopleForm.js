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
  const { emptyPerson, user, setUser } = useContext(UsersContext);

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
    //TODO: when back-end will be done, change this code
    let inputValue = (e.target && e.target.value) || "";
    let userCopy = { ...user };
    if (inputValue == "IT" || inputValue == "Dani") {
      inputValue = 1;
    }
    userCopy[`${idName}`] = inputValue;
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
          id="birthDay"
          label="Birth Day"
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
          suggestions={["IT", "HR", "EDU", "I&P", "FR"]}
          customOnChange={onInputDropdownChange}
        />
        <DropdownForm
          id="idMentor"
          label="Mentor"
          suggestions={["Dani", "Alex"]}
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
