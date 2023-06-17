const getPaidFromMinutes = (minutes, hourlyPay) => {
  return ((hourlyPay * minutes) / 60).toFixed(2);
};

export default getPaidFromMinutes;
