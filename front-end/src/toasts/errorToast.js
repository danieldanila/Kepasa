const errorToast = (toastRef, message) => {
  toastRef.current.show({
    severity: "error",
    sumary: "Error",
    detail: message,
    life: 3000,
  });
};

module.exports = errorToast;
