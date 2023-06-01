const { signToken } = require("../utils/authorization.util");
const { comparePasswords } = require("../utils/passwordEncrypt.utils");

const { CredentialsDoNotMatchError } = require("../errors");
const { NotFoundError } = require("../errors");

const User = require("../models").User;

const service = {
  userAuthentication: async (userBody) => {
    if (!userBody.email || !userBody.password) {
      throw new NotFoundError("Email or password fields were not found.");
    }

    const payload = {
      email: userBody.email,
      password: userBody.password,
    };

    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new CredentialsDoNotMatchError("Email and password do not match.");
    }

    const doPasswordsMatch = await comparePasswords(
      payload.password,
      user.password
    );

    if (!doPasswordsMatch) {
      throw new CredentialsDoNotMatchError("Email and password do not match.");
    }
    const token = signToken(user.id);

    return token;
  },
};

module.exports = service;
