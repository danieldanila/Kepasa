const getPaidFromMinutes = (minutes, hourlyPay) => {
  return parseFloat(((hourlyPay * minutes) / 60).toFixed(2));
};

export default getPaidFromMinutes;
