const router = require("express").Router();

const databaseRouter = require("./database.route");
const userRouter = require("./user.route");
const departmentRouter = require("./department.route");

router.use("/database", databaseRouter);
router.use("/user", userRouter);
router.use("/department", departmentRouter);

module.exports = router;
