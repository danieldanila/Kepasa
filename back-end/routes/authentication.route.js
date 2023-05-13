const router = require("express").Router();
const authenticationController =
  require("../controllers").AuthenticationController;

router.post("/login", authenticationController.userAuthentication);

module.exports = router;
