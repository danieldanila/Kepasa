const serverError = (res, err, message = "Server error.") => {
  console.log(err);
  res.status(500).json({ message: message });
};

const validationError = (res, err) => {
  const errorMessageArray = err.message.split("### ");
  res.status(400).json({ message: errorMessageArray });
};

module.exports = {
  serverError,
  validationError,
};
