const router = require("express").Router();
const authenticationController =
  require("../controllers").AuthenticationController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post("/login", authenticationController.login);
router.get("/logout", authenticationController.logout);
router.post("/forgotPassword", authenticationController.forgotPassword);
router.patch("/resetPassword/:token", authenticationController.resetPassword);
router.patch(
  "/updateMyPassword",
  authenticationMiddleware.protect,
  authenticationController.updatePassword
);

module.exports = router;
