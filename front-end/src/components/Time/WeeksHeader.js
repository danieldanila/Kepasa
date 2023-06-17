import getMonthName from "@/dateFunctions/getMonthName";
import styles from "../../styles/WeeksHeader.module.css";
import getDayName from "@/dateFunctions/getDayName";
import subtractOneDayFromDate from "@/dateFunctions/subtractOneDayFromDate";
import addOneDayFromDate from "@/dateFunctions/addOneDayFromDate";
import ClassicButton from "./ClassicButton";

export default function WeeksHeader({
  selectedDate,
  setSelectedDate,
  openFormDialog,
  setSendReportsDialog,
}) {
  return (
    <div className={styles.container}>
      <section className={styles.currentDayContainer}>
        <p>{`${getDayName(selectedDate)}`}</p>
        <p>{`${selectedDate.getDate()} ${getMonthName(selectedDate)}`}</p>
      </section>
      <section className={styles.actionButtons}>
        <ClassicButton onClick={openFormDialog} text={"New report"} />
        <ClassicButton
          onClick={() => setSendReportsDialog(true)}
          text={"Send reports"}
        />
        <ClassicButton
          onClick={() => setSelectedDate(subtractOneDayFromDate(selectedDate))}
          text={`<`}
        />
        <ClassicButton
          onClick={() => setSelectedDate(new Date())}
          text={"Today"}
        />
        <ClassicButton
          onClick={() => setSelectedDate(addOneDayFromDate(selectedDate))}
          text={">"}
        />
      </section>
    </div>
  );
}
