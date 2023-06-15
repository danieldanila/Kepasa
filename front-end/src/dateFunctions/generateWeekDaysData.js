import getDayName from "./getDayName";
import getWeekDatesByWeekNumber from "./getWeekDatesByWeekNumber";

const generateWeekDaysData = (
  activityReports,
  selectedWeekNumber,
  selectedYear,
  loggedUser
) => {
  const { mondayDateString, sundayDateString } = getWeekDatesByWeekNumber(
    selectedWeekNumber,
    selectedYear
  );
  const mondayDate = new Date(mondayDateString);
  const sundayDate = new Date(sundayDateString);

  const weekDaysData = [];
  const currentDate = new Date(mondayDate);

  while (currentDate <= sundayDate) {
    const currentDateString = currentDate.toISOString().split("T")[0];
    const reportsOnDate = activityReports.filter(
      (activityReport) =>
        activityReport.date === currentDateString &&
        loggedUser.id === activityReport.idUser
    );

    const investedTime = reportsOnDate.reduce(
      (totalTime, report) => totalTime + report.investedTime,
      0
    );

    weekDaysData.push({
      date: currentDateString,
      name: getDayName(currentDate),
      investedTime: investedTime,
      activityReports: reportsOnDate,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDaysData;
};

export default generateWeekDaysData;
