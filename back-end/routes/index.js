const router = require("express").Router();

const DatabaseRouter = require("./database.route");
const UserRouter = require("./user.route");
const DepartmentRouter = require("./department.route");
const AuthenticationRouter = require("./authentication.route");
const ProjectRouter = require("./project.route");

router.use("/database", DatabaseRouter);
router.use("/user", UserRouter);
router.use("/department", DepartmentRouter);
router.use("/authentication", AuthenticationRouter);
router.use("/project", ProjectRouter);

module.exports = router;
