const {
  signToken,
  createPasswordResetToken,
} = require("../utils/authorization.util");

const { CredentialsDoNotMatchError } = require("../errors");
const { NotFoundError } = require("../errors");
const sendEmail = require("../utils/email.util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { passwordValidation } = require("../validations/general.validation");
const { validateCompletedField } = require("../validations/general.validation");
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const User = require("../models").User;

const service = {
  login: async (userBody) => {
    if (!userBody.email || !userBody.password) {
      throw new NotFoundError("Email or password fields were not found.");
    }

    const payload = {
      email: userBody.email,
      password: userBody.password,
    };

    const user = await User.scope("withPassword").findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new CredentialsDoNotMatchError("Email and password do not match.");
    }

    const arePasswordsEqual = await User.arePasswordsEqual(
      payload.password,
      user.password
    );

    if (!arePasswordsEqual) {
      throw new CredentialsDoNotMatchError("Email and password do not match.");
    }
    const token = signToken(user.id);

    return token;
  },

  forgotPassword: async (userEmail) => {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundError("User is the given email was not found.");
    }

    const resetToken = createPasswordResetToken(user);

    await user.save();

    const resetURL = `${process.env.HOST}:${process.env.PORT}/authentication/resetPassword/${resetToken}`;

    const message = `Forgot your password? Please reset your password here: ${resetURL}.\nIf you didn't request to reset your password please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset for Kepasa",
        message,
      });
    } catch (err) {
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();

      throw new Error("There was an error when sending the email.");
    }
  },

  resetPassword: async (tokenParam, password) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(tokenParam)
      .digest("hex");

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      throw new NotFoundError("Token is invalid or has expired.");
    }

    const errors = [];
    validateCompletedField(
      passwordValidation,
      password,
      "Password",
      errors,
      true
    );

    if (errors.length > 0) {
      throwValidationErrorWithMessage(errors);
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    const token = signToken(user.id);

    return token;
  },

  updatePassword: async (loggedUser, userBody) => {
    const user = await User.scope("withPassword").findByPk(loggedUser.id);

    if (
      !(await User.arePasswordsEqual(userBody.currentPassword, user.password))
    ) {
      throw new CredentialsDoNotMatchError("Current password is wrong.");
    }

    const errors = [];
    validateCompletedField(
      passwordValidation,
      userBody.password,
      "Password",
      errors,
      true
    );

    if (errors.length > 0) {
      throwValidationErrorWithMessage(errors);
    }

    user.password = userBody.password;

    await user.save();

    const token = signToken(user.id);

    return token;
  },
};

module.exports = service;
