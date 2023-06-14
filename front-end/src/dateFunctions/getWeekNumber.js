const getWeekNumber = (date) => {
  const dayOfWeek = date.getUTCDay();
  const firstDayOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  const firstMonday = new Date(firstDayOfYear);

  while (firstMonday.getUTCDay() !== 1) {
    firstMonday.setUTCDate(firstMonday.getUTCDate() + 1);
  }

  const daysDifferenceBetweenDateAndFirstMonday = Math.floor(
    (date - firstMonday) / (24 * 60 * 60 * 1000)
  );

  let weekNumber = Math.floor(daysDifferenceBetweenDateAndFirstMonday / 7) + 1;

  if (dayOfWeek === 1 && daysDifferenceBetweenDateAndFirstMonday % 7 !== 0) {
    weekNumber -= 1;
  }

  return weekNumber;
};

export default getWeekNumber;
