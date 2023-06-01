const router = require("express").Router();
const authenticationController =
  require("../controllers").AuthenticationController;

router.post("/login", authenticationController.userAuthentication);
router.post("/forgotPassword", authenticationController.forgotPassword);
router.patch("/resetPassword/:token", authenticationController.resetPassword);

module.exports = router;
