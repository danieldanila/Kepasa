const catchAsync = require("../utils/catchAsync.util");

const authenticationService = require("../services").AuthenticationService;

const controller = {
  userAuthentication: catchAsync(async (req, res) => {
    const token = await authenticationService.userAuthentication(req.body);
    res.status(200).json({
      message: "Succesful login.",
      token,
    });
  }),
};

module.exports = controller;
