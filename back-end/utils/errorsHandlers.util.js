const { NotFoundError } = require("../errors").NotFoundError;
const { ValidationError } = require("../errors").ValidationError;
const { CredentialsDoNotMatchError } =
  require("../errors").CredentialsDoNotMatchError;

const notFoundErrorHandler = (res, err) => {
  res.status(404).json({ message: err.message });
};

const validationErrorHandler = (res, err) => {
  const errorMessageArray = err.message.split("; ");
  res.status(400).json({ message: errorMessageArray });
};

const credentialsDoNotMatchErrorHandler = (res, err) => {
  res.status(401).json({ message: err.message });
};

const serverErrorHandler = (res, err, message = "Server error.") => {
  console.log(err);
  res.status(500).json({ message: message });
};

const errorsHandlerWrapper = (res, err) => {
  if (err instanceof NotFoundError) {
    notFoundErrorHandler(res, err);
  } else if (err instanceof ValidationError) {
    validationErrorHandler(res, err);
  } else if (err instanceof CredentialsDoNotMatchError) {
    credentialsDoNotMatchErrorHandler(res, err);
  } else {
    serverErrorHandler(res, err);
  }
};

module.exports = {
  validationErrorHandler,
  serverErrorHandler,
  notFoundErrorHandler,
  errorsHandlerWrapper,
};
