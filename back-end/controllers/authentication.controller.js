const catchAsync = require("../utils/catchAsync.util");

const authenticationService = require("../services").AuthenticationService;

const controller = {
  login: catchAsync(async (req, res, next) => {
    const token = await authenticationService.login(req.body);
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

  updatePassword: catchAsync(async (req, res, next) => {
    const token = await authenticationService.updatePassword(
      req.user,
      req.body
    );
    res.status(200).json({ message: "Succesful password update.", token });
  }),
};

module.exports = controller;
