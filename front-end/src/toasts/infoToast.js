const infoToast = (toastRef, messages) => {
  const messagesArray = [].concat(messages);
  const toastInfo = [];

  for (const message of messagesArray) {
    toastInfo.push({
      severity: "info",
      sumary: "Info",
      detail: message,
      life: 3000,
    });
  }

  toastRef.current.show(toastInfo);
};

module.exports = infoToast;
