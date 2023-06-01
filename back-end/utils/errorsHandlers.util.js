const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { NotFoundError } = require("../errors");
const { ValidationError } = require("../errors");
const { CredentialsDoNotMatchError } = require("../errors");
const UnauthorizedError = require("../errors/unauthorizedError");
const ForbiddenError = require("../errors/forbiddenError");

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

const unauthorizedErrorHandler = (res, err) => {
  res.status(401).json({ message: err.message });
};

const forbiddenErrorHandler = (res, err) => {
  res.status(403).json({ message: err.message });
};

const jwtTokenExpiredErrorHandler = (res) => {
  res
    .status(401)
    .json({ message: "Your token has expired. Please log in again!" });
};

const jwtErrorHandler = (res) => {
  res.status(401).json({ message: "Invalid token. Please log in again!" });
};

const serverErrorHandler = (res, err, message = "Server error.") => {
  console.log(err);
  res.status(500).json({ message: message });
};

const errorsHandlerWrapper = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    notFoundErrorHandler(res, err);
  } else if (err instanceof ValidationError) {
    validationErrorHandler(res, err);
  } else if (err instanceof CredentialsDoNotMatchError) {
    credentialsDoNotMatchErrorHandler(res, err);
  } else if (err instanceof UnauthorizedError) {
    unauthorizedErrorHandler(res, err);
  } else if (err instanceof ForbiddenError) {
    forbiddenErrorHandler(res, err);
  } else if (err instanceof TokenExpiredError) {
    jwtTokenExpiredErrorHandler(res);
  } else if (err instanceof JsonWebTokenError) {
    jwtErrorHandler(res);
  } else {
    serverErrorHandler(res, err);
  }
};

module.exports = errorsHandlerWrapper;
