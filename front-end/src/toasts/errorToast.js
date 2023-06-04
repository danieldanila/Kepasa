const errorToast = (toastRef, messages) => {
  const messagesArray = [].concat(messages);
  const toastErrors = [];

  for (const message of messagesArray) {
    toastErrors.push({
      severity: "error",
      sumary: "Error",
      detail: message,
      life: 3000,
    });
  }

  toastRef.current.show(toastErrors);
};

module.exports = errorToast;
