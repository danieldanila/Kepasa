const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const changedPasswordAfter = (changedPasswordAt, jwtTimestamp) => {
  if (changedPasswordAt) {
    const changedTimestamp = parseInt(changedPasswordAt.getTime() / 1000, 10);

    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = {
  signToken,
  changedPasswordAfter,
};
