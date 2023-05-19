const DatabaseService = require("./database.service");
const UserService = require("./user.service");
const DepartmentService = require("./department.service");
const AuthenticationService = require("./authentication.service");
const ProjectService = require("./project.service");
const RoleService = require("./role.service");
const UsersProjectsRolesService = require("./usersProjectsRoles.service");

module.exports = {
  DatabaseService,
  UserService,
  DepartmentService,
  AuthenticationService,
  ProjectService,
  RoleService,
  UsersProjectsRolesService,
};
