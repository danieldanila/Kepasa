import WeekDay from "./WeekDay";
import styles from "../../styles/Weeks.module.css";
import { useContext, useEffect, useState } from "react";
import { ActivityReportsContext } from "@/pages/_app";
import getWeekNumber from "@/dateFunctions/getWeekNumber";
import generateWeekDaysData from "@/dateFunctions/generateWeekDaysData";
import formatDateToString from "@/dateFunctions/formatDateToString";
import WeeksHeader from "./WeeksHeader";

export default function Weeks() {
  const { activityReports } = useContext(ActivityReportsContext);

  const [selectedWeekNumber, setSelectedWeekNumber] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const weekDays = generateWeekDaysData(
      activityReports,
      selectedWeekNumber,
      selectedYear
    );

    setWeekDays(weekDays);
  }, [activityReports, selectedWeekNumber, selectedYear]);

  const [totalInvestedTime, setTotalInvestedTime] = useState(0);

  useEffect(() => {
    setTotalInvestedTime(
      weekDays.reduce((sum, day) => sum + day.investedTime, 0)
    );
  }, [weekDays]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedWeekNumber(getWeekNumber(selectedDate));
  }, [selectedDate]);

  const handleDayClick = (dateString) => {
    setSelectedDate(new Date(dateString));
  };

  return (
    <>
      <WeeksHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className={styles.container}>
        {weekDays.map((day) => (
          <WeekDay
            dateString={day.date}
            key={day.date}
            dayName={day.name}
            minutesLogged={day.investedTime}
            isSelected={formatDateToString(selectedDate) === day.date}
            onClick={handleDayClick}
          />
        ))}
        <WeekDay
          dayName="Total"
          minutesLogged={totalInvestedTime}
          onClick={() => {}}
        />
      </div>
    </>
  );
}
