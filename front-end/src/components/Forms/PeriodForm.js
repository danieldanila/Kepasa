import { Dialog } from "primereact/dialog";
import InputTextForm from "./FormsInput/InputTextForm";
import styles from "../../styles/PeopleForm.module.css";
import { PeriodsContext } from "@/pages/_app";
import { useContext } from "react";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import CalendarForm from "./FormsInput/CalendarForm";

export default function PeriodForm({
  visible,
  onHide,
  dialogFooter,
  isUpdate,
  dataEntity,
}) {
  const { period, setPeriod } = useContext(PeriodsContext);

  return (
    <Dialog
      className={styles.container}
      visible={visible}
      onHide={onHide}
      dismissableMask
      header="Period details"
      footer={dialogFooter}
      blockScroll
    >
      <div className={styles.inputContainer}>
        <InputTextForm
          id="name"
          label="Name"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.name}
          objectState={period}
          setObjectState={setPeriod}
        />
        <CalendarForm
          id="startDate"
          label="Start Date"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.startDate}
          objectState={period}
          setObjectState={setPeriod}
        />
        <CalendarForm
          id="endDate"
          label="End Date"
          customOnChange={onInputTextChange}
          initialValue={dataEntity.endDate}
          objectState={period}
          setObjectState={setPeriod}
        />
      </div>
    </Dialog>
  );
}
