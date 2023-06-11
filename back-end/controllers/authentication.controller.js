const catchAsync = require("../utils/catchAsync.util");

const authenticationService = require("../services").AuthenticationService;

const createSendToken = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);
};

const controller = {
  login: catchAsync(async (req, res, next) => {
    const token = await authenticationService.login(req.body);

    createSendToken(token, res);

    res.status(200).json({
      message: "Succesful login.",
      token,
    });
  }),

  logout: catchAsync(async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ status: "success" });
  }),

  tokenExpirationTimestamp: async (req, res, next) => {
    try {
      const expired = await authenticationService.tokenExpirationTimestamp(
        req.cookies.jwt
      );

      res.status(200).json({ message: expired.exp * 1000 });
    } catch (err) {
      res.status(401).json({ message: err.expiredAt * 1 });
    }
  },

  forgotPassword: catchAsync(async (req, res, next) => {
    await authenticationService.forgotPassword(req.body.email);
    res.status(200).json({
      message: "Account recovery email sent.",
    });
  }),

  resetPassword: catchAsync(async (req, res, next) => {
    const userUpdated = await authenticationService.resetPassword(
      req.params.token,
      req.body.password
    );

    res
      .status(200)
      .json({ message: `Sucessful password reset for ${userUpdated.email}.` });
  }),

  updatePassword: catchAsync(async (req, res, next) => {
    const token = await authenticationService.updatePassword(
      req.user,
      req.body
    );

    createSendToken(token, res);

    res
      .status(200)
      .json({ message: "You successfully updatec your password.", token });
  }),
};

module.exports = controller;
