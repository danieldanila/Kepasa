import getDayName from "./getDayName";
import getWeekDatesByWeekNumber from "./getWeekDatesByWeekNumber";

const generateWeekDaysData = (
  activityReports,
  selectedWeekNumber,
  selectedYear
) => {
  const { mondayDateString, sundayDateString } = getWeekDatesByWeekNumber(
    selectedWeekNumber,
    selectedYear
  );
  const mondayDate = new Date(mondayDateString);
  const sundayDate = new Date(sundayDateString);

  const weekDays = [];
  const currentDate = new Date(mondayDate);

  while (currentDate <= sundayDate) {
    const currentDateString = currentDate.toISOString().split("T")[0];
    const reportsOnDate = activityReports.filter(
      (activityReport) => activityReport.date === currentDateString
    );

    const investedTime = reportsOnDate.reduce(
      (totalTime, report) => totalTime + report.investedTime,
      0
    );

    weekDays.push({
      date: currentDateString,
      name: getDayName(currentDate),
      investedTime: investedTime,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDays;
};

export default generateWeekDaysData;
