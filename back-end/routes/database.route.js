const router = require("express").Router();
const databaseController = require("../controllers/database.controller");

router.get("/sync", databaseController.sync);

module.exports = router;
