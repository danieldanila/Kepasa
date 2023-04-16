import { Dialog } from "primereact/dialog";
import InputTextForm from "./InputTextForm";
import CalendarForm from "./CalendarForm";
import DropdownForm from "./DropdownForm";
import PasswordForm from "./PasswordForm";
import ToggleButtonForm from "./ToggleButtonForm";
import styles from "../../styles/PeopleForm.module.css";

export default function PeopleForm({ visible, onHide }) {
  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Person details"
    >
      <div className={styles.inputContainer}>
        <InputTextForm id="firstName" label="First Name" keyfilter="alpha" />
        <InputTextForm id="lastName" label="Last Name" keyfilter="alpha" />
        <InputTextForm id="email" label="Email" keyfilter="email" />
        <InputTextForm id="phone" label="Phone" keyfilter="pint" />
        <CalendarForm id="birthDay" label="Birth Day" />
        <InputTextForm id="socialMediaLink" label="Social Media Link" />
        <DropdownForm
          id="department"
          label="Department"
          suggestions={["IT", "HR", "EDU", "I&P", "FR"]}
        />
        <DropdownForm
          id="mentor"
          label="Mentor"
          suggestions={["Dani", "Alex"]}
        />
        <PasswordForm id="password" label="Initial password" />
        <ToggleButtonForm
          id="isAdministrator"
          onLabel="Is Administrator"
          offLabel="Is NOT Administrator"
        />
      </div>
    </Dialog>
  );
}
