const router = require("express").Router();
const databaseController = require("../controllers").DatabaseController;

router.get("/sync", databaseController.sync);

module.exports = router;
