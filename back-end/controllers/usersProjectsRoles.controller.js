const catchAsync = require("../utils/catchAsync.util");

const usersProjectsRolesService =
  require("../services").UsersProjectsRolesService;

const controller = {
  createUsersProjectRoles: catchAsync(async (req, res, next) => {
    await usersProjectsRolesService.createUsersProjectsRoles(req.body);
    res.status(201).json({
      message: `User ${req.body.idUser} on the ${req.body.idProject} project with the following role: ${req.body.idRole} was created.`,
    });
  }),

  createMultipleUsersProjectsRoles: catchAsync(async (req, res, next) => {
    await usersProjectsRolesService.createMultipleUsersProjectsRoles(req.body);
    res.status(201).json({
      message: `${req.body.length} usersProjectsRoles created`,
    });
  }),

  getAllUsersProjectsRoles: catchAsync(async (req, res, next) => {
    const usersProjectsRoles =
      await usersProjectsRolesService.getAllUsersProjectsRoles();
    res.status(200).json(usersProjectsRoles);
  }),

  getUsersProjectsRolesByCompositeId: catchAsync(async (req, res, next) => {
    const usersProjectsRoles =
      await usersProjectsRolesService.getUsersProjectsRolesByCompositeId(
        req.params.idUser,
        req.params.idProject
      );
    res.status(200).json(usersProjectsRoles);
  }),

  updateUsersProjectsRoles: catchAsync(async (req, res, next) => {
    const updatedUsersProjectsRoles =
      await usersProjectsRolesService.updateUsersProjectsRoles(
        req.params.idUser,
        req.params.idProject,
        req.body
      );
    res.status(202).json(updatedUsersProjectsRoles);
  }),

  deleteUsersProjectsRoles: catchAsync(async (req, res, next) => {
    await usersProjectsRolesService.deleteUsersProjectsRoles(
      req.params.idUser,
      req.params.idProject
    );
    res.status(200).json({ message: "Users Porjects Roles deleted." });
  }),

  getUserProjects: catchAsync(async (req, res, next) => {
    const userProjects = await usersProjectsRolesService.getUserProjects(
      req.params.idUser
    );
    res.status(200).json(userProjects);
  }),

  getProjectUsers: catchAsync(async (req, res, next) => {
    const projectUsers = await usersProjectsRolesService.getProjectUsers(
      req.params.idProject
    );
    res.status(200).json(projectUsers);
  }),

  getUserRoleOnProject: catchAsync(async (req, res, next) => {
    const userRoleOnProject =
      await usersProjectsRolesService.getUserRoleOnProject(
        req.params.idUser,
        req.params.idProject
      );
    res.status(200).json(userRoleOnProject);
  }),

  getUserRoleOnDepartmentProject: catchAsync(async (req, res, next) => {
    const userRoleOnDepartmentProject =
      await usersProjectsRolesService.getUserRoleOnDepartmentProject(
        req.params.idUser
      );
    res.status(200).json(userRoleOnDepartmentProject);
  }),

  getUserRolesOnProjects: catchAsync(async (req, res, next) => {
    const userRoles = await usersProjectsRolesService.getUserRolesOnProjects(
      req.params.idUser
    );
    res.status(200).json(userRoles);
  }),

  getRoleUsersOnProjects: catchAsync(async (req, res, next) => {
    const roleUsers = await usersProjectsRolesService.getRoleUsersOnProjects(
      req.params.idRole
    );
    res.status(200).json(roleUsers);
  }),

  getProjectRolesWithUsers: catchAsync(async (req, res, next) => {
    const projectRoles =
      await usersProjectsRolesService.getProjectRolesWithUsers(
        req.params.idProject
      );
    res.status(200).json(projectRoles);
  }),
};

module.exports = controller;
