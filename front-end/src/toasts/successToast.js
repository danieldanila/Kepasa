const successToast = (toastRef, message) => {
  toastRef.current.show({
    severity: "success",
    sumary: "Success",
    detail: message,
    life: 3000,
  });
};

module.exports = successToast;
