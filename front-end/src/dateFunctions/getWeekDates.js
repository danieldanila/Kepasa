import formatDateToString from "./formatDateToString";

const getWeekDates = (dateString) => {
  const date = new Date(dateString);

  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay() + 1);

  const endDate = new Date(date);
  endDate.setDate(startDate.getDate() + 6);

  const formattedStartDate = formatDateToString(startDate);
  const formattedEndDate = formatDateToString(endDate);

  return { startDate: formattedStartDate, endDate: formattedEndDate };
};

export default getWeekDates;
