const { comparePasswords } = require("../utils/passwordEncrypt.utils");

const { CredentialsDoNotMatchError } =
  require("../errors").CredentialsDoNotMatchError;
const { NotFoundError } = require("../errors").NotFoundError;

const User = require("../models/index").User;

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

    return user;
  },
};

module.exports = service;