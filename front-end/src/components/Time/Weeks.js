import WeekDay from "./WeekDay";
import styles from "../../styles/Weeks.module.css";
import { useContext, useEffect, useState } from "react";
import { ActivityReportsContext, LoggedUserContext } from "@/pages/_app";
import getWeekNumber from "@/dateFunctions/getWeekNumber";
import generateWeekDaysData from "@/dateFunctions/generateWeekDaysData";
import formatDateToString from "@/dateFunctions/formatDateToString";
import WeeksHeader from "./WeeksHeader";
import WeekDayReports from "./WeekDayReports";

export default function Weeks() {
  const { activityReports } = useContext(ActivityReportsContext);
  const { loggedUser } = useContext(LoggedUserContext);

  const [selectedWeekNumber, setSelectedWeekNumber] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());

  const [weekDaysData, setWeekDaysData] = useState([]);

  useEffect(() => {
    const weekDaysData = generateWeekDaysData(
      activityReports,
      selectedWeekNumber,
      selectedYear,
      loggedUser
    );

    setWeekDaysData(weekDaysData);
  }, [activityReports, selectedWeekNumber, selectedYear]);

  const [totalInvestedTime, setTotalInvestedTime] = useState(0);

  useEffect(() => {
    setTotalInvestedTime(
      weekDaysData.reduce((sum, day) => sum + day.investedTime, 0)
    );
  }, [weekDaysData]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedWeekNumber(getWeekNumber(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    setSelectedYear(selectedDate.getUTCFullYear());
  }, [selectedDate.getUTCFullYear()]);

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
        {weekDaysData.map((day) => (
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
      <div>
        {weekDaysData
          .filter((day) => formatDateToString(selectedDate) === day.date)
          .map((day) => (
            <WeekDayReports activityReports={day.activityReports} />
          ))}
      </div>
    </>
  );
}
