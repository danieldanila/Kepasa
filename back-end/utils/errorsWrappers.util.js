const { ValidationError } = require("../errors");

const throwValidationErrorWithMessage = (errors) => {
  const errorMessage = `${errors.join("; ")}`;
  throw new ValidationError(errorMessage);
};

module.exports = {
  throwValidationErrorWithMessage,
};
