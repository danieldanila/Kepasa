import styles from "../../styles/WeekDay.module.css";

export default function WeekDay({
  dateString,
  dayName,
  minutesLogged,
  isSelected,
  onClick,
}) {
  const hours = Math.floor(minutesLogged / 60);
  const remainingMinutes = minutesLogged % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;

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
      <p>{formattedTime}</p>
    </div>
  );
}
