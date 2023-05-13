const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const authenticationService = require("../services").AuthenticationService;

const controller = {
  userAuthentication: async (req, res) => {
    try {
      const user = await authenticationService.userAuthentication(req.body);
      res.status(200).json({
        message: "Succesful login.",
        details: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
