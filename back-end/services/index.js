const DatabaseService = require("./database.service");
const UserService = require("./user.service");
const DepartmentService = require("./department.service");
const AuthenticationService = require("./authentication.service");
const ProjectService = require("./project.service");
const RoleService = require("./role.service");
const UsersProjectsRolesService = require("./usersProjectsRoles.service");
const RolesProjectsService = require("./rolesProjects.service");
const PeriodService = require("./period.service");
const ObjectiveService = require("./objective.service");
const TaskTypeService = require("./taskType.service");
const ActivityReportService = require("./activityReport.service");

module.exports = {
  DatabaseService,
  UserService,
  DepartmentService,
  AuthenticationService,
  ProjectService,
  RoleService,
  UsersProjectsRolesService,
  RolesProjectsService,
  PeriodService,
  ObjectiveService,
  TaskTypeService,
  ActivityReportService,
};
