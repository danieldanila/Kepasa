const router = require("express").Router();

const databaseRouter = require("./database.route");

router.use("/database", databaseRouter);

module.exports = router;
