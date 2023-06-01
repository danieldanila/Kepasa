const catchAsync = require("../utils/catchAsync.util");

const authenticationService = require("../services").AuthenticationService;

const controller = {
  userAuthentication: catchAsync(async (req, res, next) => {
    const token = await authenticationService.userAuthentication(req.body);
    res.status(200).json({
      message: "Succesful login.",
      token,
    });
  }),

  forgotPassword: catchAsync(async (req, res, next) => {
    await authenticationService.forgotPassword(req.body.email);
    res.status(200).json({
      message: "Token sent to email.",
    });
  }),

  resetPassword: catchAsync(async (req, res, next) => {
    const token = await authenticationService.resetPassword(
      req.params.token,
      req.body.password
    );
    res.status(200).json({ nessage: "Sucessful password reset.", token });
  }),
};

module.exports = controller;
