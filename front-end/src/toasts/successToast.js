const successToast = (toastRef, messages) => {
  const messagesArray = [].concat(messages);
  const toastSuccess = [];

  for (const message of messagesArray) {
    toastSuccess.push({
      severity: "success",
      sumary: "Success",
      detail: message,
      life: 3000,
    });
  }

  toastRef.current.show(toastSuccess);
};

module.exports = successToast;
