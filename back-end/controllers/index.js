const DatabaseController = require("./database.controller");
const UserController = require("./user.controller");
const DepartmentController = require("./department.controller");
const AuthenticationController = require("./authentication.controller");
const ProjectController = require("./project.controller");
const RoleController = require("./role.controller");
const UsersProjectsRolesController = require("./usersProjectsRoles.controller");

module.exports = {
  DatabaseController,
  UserController,
  DepartmentController,
  AuthenticationController,
  ProjectController,
  RoleController,
  UsersProjectsRolesController,
};
