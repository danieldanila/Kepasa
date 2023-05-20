const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const usersProjectsRolesService =
  require("../services").UsersProjectsRolesService;

const controller = {
  createUsersProjectRoles: async (req, res) => {
    try {
      await usersProjectsRolesService.createUsersProjectsRoles(req.body);
      res.status(201).json({
        message: `User ${req.body.idUser} on the ${req.body.idProject} project with the following role: ${req.body.idRole} was created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleUsersProjectsRoles: async (req, res) => {
    try {
      await usersProjectsRolesService.createMultipleUsersProjectsRoles(
        req.body
      );
      res.status(201).json({
        message: `${req.body.length} usersProjectsRoles created`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllUsersProjectsRoles: async (req, res) => {
    try {
      const usersProjectsRoles =
        await usersProjectsRolesService.getAllUsersProjectsRoles();
      res.status(200).json(usersProjectsRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUsersProjectsRolesByCompositeId: async (req, res) => {
    try {
      const usersProjectsRoles =
        await usersProjectsRolesService.getUsersProjectsRolesByCompositeId(
          req.params.idUser,
          req.params.idProject
        );
      res.status(200).json(usersProjectsRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateUsersProjectsRoles: async (req, res) => {
    try {
      const updatedUsersProjectsRoles =
        await usersProjectsRolesService.updateUsersProjectsRoles(
          req.params.idUser,
          req.params.idProject,
          req.body
        );
      res.status(202).json(updatedUsersProjectsRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteUsersProjectsRoles: async (req, res) => {
    try {
      await usersProjectsRolesService.deleteUsersProjectsRoles(
        req.params.idUser,
        req.params.idProject
      );
      res.status(200).json({ message: "Users Porjects Roles deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserProjects: async (req, res) => {
    try {
      const userProjects = await usersProjectsRolesService.getUserProjects(
        req.params.idUser
      );
      res.status(200).json(userProjects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectUsers: async (req, res) => {
    try {
      const projectUsers = await usersProjectsRolesService.getProjectUsers(
        req.params.idProject
      );
      res.status(200).json(projectUsers);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserRoleOnProject: async (req, res) => {
    try {
      const userRoleOnProject =
        await usersProjectsRolesService.getUserRoleOnProject(
          req.params.idUser,
          req.params.idProject
        );
      res.status(200).json(userRoleOnProject);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserRolesOnProjects: async (req, res) => {
    try {
      const userRoles = await usersProjectsRolesService.getUserRolesOnProjects(
        req.params.idUser
      );
      res.status(200).json(userRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getRoleUsersOnProjects: async (req, res) => {
    try {
      const roleUsers = await usersProjectsRolesService.getRoleUsersOnProjects(
        req.params.idRole
      );
      res.status(200).json(roleUsers);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectRolesWithUsers: async (req, res) => {
    try {
      const projectRoles =
        await usersProjectsRolesService.getProjectRolesWithUsers(
          req.params.idProject
        );
      res.status(200).json(projectRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
