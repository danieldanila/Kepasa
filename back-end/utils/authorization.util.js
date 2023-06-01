const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

const createPasswordResetToken = (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, user.passwordResetToken);

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = {
  signToken,
  changedPasswordAfter,
  createPasswordResetToken,
};
