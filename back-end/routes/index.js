const router = require("express").Router();

const DatabaseRouter = require("./database.route");
const UserRouter = require("./user.route");
const DepartmentRouter = require("./department.route");
const AuthenticationRouter = require("./authentication.route");
const ProjectRouter = require("./project.route");
const RoleRouter = require("./role.route");
const UsersProjectsRolesRouter = require("./usersProjectsRoles.route");
const RolesProjectsRouter = require("./rolesProjects.route");
const PeriodRouter = require("./period.route");
const ObjectiveRouter = require("./objective.route");
const TaskTypeRouter = require("./taskType.route");
const ActivityReportRouter = require("./activityReport.route");

const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.use(authenticationMiddleware.isLoggedIn);

router.use("/database", DatabaseRouter);
router.use("/user", UserRouter);
router.use("/department", DepartmentRouter);
router.use("/authentication", AuthenticationRouter);
router.use("/project", ProjectRouter);
router.use("/role", RoleRouter);
router.use("/usersProjectsRoles", UsersProjectsRolesRouter);
router.use("/rolesProjects", RolesProjectsRouter);
router.use("/period", PeriodRouter);
router.use("/objective", ObjectiveRouter);
router.use("/taskType", TaskTypeRouter);
router.use("/activityReport", ActivityReportRouter);

module.exports = router;
