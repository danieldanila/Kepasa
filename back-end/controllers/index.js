const DatabaseController = require("./database.controller");
const UserController = require("./user.controller");
const DepartmentController = require("./department.controller");
const AuthenticationController = require("./authentication.controller");
const ProjectController = require("./project.controller");
const RoleController = require("./role.controller");
const UsersProjectsRolesController = require("./usersProjectsRoles.controller");
const RolesProjectsController = require("./rolesProjects.controller");
const PeriodController = require("./period.controller");
const ObjectiveController = require("./objective.controller");
const TaskTypeController = require("./taskType.controller");
const ActivityReportController = require("./activityReport.controller");

module.exports = {
  DatabaseController,
  UserController,
  DepartmentController,
  AuthenticationController,
  ProjectController,
  RoleController,
  UsersProjectsRolesController,
  RolesProjectsController,
  PeriodController,
  ObjectiveController,
  TaskTypeController,
  ActivityReportController,
};
