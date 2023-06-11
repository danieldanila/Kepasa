import formatDateToString from "./formatDateToString";

const getWeekDatesByWeekNumber = (weekNumber, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const firstMonday = new Date(firstDayOfYear);

  while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
  }

  const startDate = new Date(firstMonday);
  startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  const formattedStartDate = formatDateToString(startDate);
  const formattedEndDate = formatDateToString(endDate);

  return {
    mondayDateString: formattedStartDate,
    sundayDateString: formattedEndDate,
  };
};

export default getWeekDatesByWeekNumber;
