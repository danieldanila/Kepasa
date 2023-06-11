import getMonthName from "@/dateFunctions/getMonthName";
import styles from "../../styles/WeeksHeader.module.css";
import getDayName from "@/dateFunctions/getDayName";
import subtractOneDayFromDate from "@/dateFunctions/subtractOneDayFromDate";
import addOneDayFromDate from "@/dateFunctions/addOneDayFromDate";

export default function WeeksHeader({ selectedDate, setSelectedDate }) {
  return (
    <div className={styles.container}>
      <section className={styles.currentDayContainer}>
        <p>{`${getDayName(selectedDate)}`}</p>
        <p>{`${selectedDate.getDate()} ${getMonthName(selectedDate)}`}</p>
      </section>
      <section className={styles.actionButtons}>
        <button>Send reports</button>
        <button
          onClick={() => setSelectedDate(subtractOneDayFromDate(selectedDate))}
        >
          &lt;
        </button>
        <button onClick={() => setSelectedDate(new Date())}>Today</button>
        <button
          onClick={() => setSelectedDate(addOneDayFromDate(selectedDate))}
        >
          &gt;
        </button>
      </section>
    </div>
  );
}
