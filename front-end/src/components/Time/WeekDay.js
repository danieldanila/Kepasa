import minutesToFormattedTime from "@/dateFunctions/minutesToFormattedTime";
import styles from "../../styles/WeekDay.module.css";

export default function WeekDay({
  dateString,
  dayName,
  minutesLogged,
  isSelected,
  onClick,
}) {
  const handleDayClick = () => {
    onClick(dateString);
  };

  return (
    <div
      id={dateString}
      key={dateString}
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={handleDayClick}
    >
      <p>{dayName}</p>
      <p>{minutesToFormattedTime(minutesLogged)}</p>
    </div>
  );
}
