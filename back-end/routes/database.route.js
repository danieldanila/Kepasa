const router = require("express").Router();
const database = require("../controllers/database.controller");

router.get("/sync", database.sync);

module.exports = router;
