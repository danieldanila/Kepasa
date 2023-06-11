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
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../models").User;

const service = {
  login: async (userBody) => {
    if (!userBody.email || !userBody.password) {
      throw new NotFoundError("Email or password field was not found.");
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
      throw new CredentialsDoNotMatchError(
        "Credentials provided do not match with our records."
      );
    }

    const arePasswordsEqual = await User.arePasswordsEqual(
      payload.password,
      user.password
    );

    if (!arePasswordsEqual) {
      throw new CredentialsDoNotMatchError(
        "Credentials provided do not match with our records."
      );
    }
    const token = signToken(user.id);

    return token;
  },

  tokenExpirationTimestamp: async (jwtToken) => {
    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );

    return decoded;
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

    const resetURL = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.FRONT_END_PORT}/resetPassword/${resetToken}`;

    const message = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #007bff;
          text-align: center;
        }

        p {
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }

        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Forgot Your Password?</h1>
        <p>Please reset your password by clicking the button below:</p>
        <p>
          <a class="button" href="${resetURL}">Reset Password</a>
        </p>
        <p>If you didn't request to reset your password, please ignore this email!</p>
      </div>
    </body>
    </html>
    `;

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
      false
    );

    if (errors.length > 0) {
      throwValidationErrorWithMessage(errors);
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    return user;
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
      false
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
