const { idParamaterValidation } = require("../validations/general.validation");
const usersProjectsRolesValidation =
  require("../validations").UsersProjectsRolesValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { NotFoundError } = require("../errors").NotFoundError;

const UsersProjectsRoles = require("../models").UsersProjectsRoles;

const getAllUsers = require("./user.service").getAllUsers;
const getAllProjects = require("./project.service").getAllProjects;
const getAllRoles = require("./role.service").getAllRoles;

const service = {
  createUsersProjectsRoles: async (usersProjectsRolesBody) => {
    const existingUsersProjectsRoles = await service.getAllUsersProjectsRoles();
    const existingUsers = await getAllUsers();
    const existingProjects = await getAllProjects();
    const existingRoles = await getAllRoles();
    const errors =
      await usersProjectsRolesValidation.checkUsersProjectsRolesFields(
        usersProjectsRolesBody,
        existingUsersProjectsRoles,
        existingUsers,
        existingProjects,
        existingRoles,
        false
      );

    if (errors.length === 0) {
      await UsersProjectsRoles.create(usersProjectsRolesBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleUsersProjectsRoles: async (arrayOfUsersProjectsRolesBodies) => {
    for (const usersProjectsRolesBody of arrayOfUsersProjectsRolesBodies) {
      await service.createUsersProjectsRoles(usersProjectsRolesBody);
    }
  },

  getAllUsersProjectsRoles: async () => {
    const usersProjectsRoles = await UsersProjectsRoles.findAll();
    return usersProjectsRoles;
  },

  getUsersProjectsRolesByCompositeId: async (userId, projectId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);
    idParamaterValidation(projectId, "Project id", errors);

    const usersProjectsRoles = await UsersProjectsRoles.findOne({
      where: {
        idUser: userId,
        idProject: projectId,
      },
    });

    if (usersProjectsRoles) {
      return usersProjectsRoles;
    } else {
      throw new NotFoundError("Users Projects Roles not found.");
    }
  },

  updateUsersProjectsRoles: async (
    userId,
    projectId,
    usersProjectsRolesBody
  ) => {
    const existingUsersProjectsRoles = await service.getAllUsersProjectsRoles();
    const existingUsers = await getAllUsers();
    const existingProjects = await getAllProjects();
    const existingRoles = await getAllRoles();
    const errors =
      await usersProjectsRolesValidation.checkUsersProjectsRolesFields(
        usersProjectsRolesBody,
        existingUsersProjectsRoles,
        existingUsers,
        existingProjects,
        existingRoles,
        true
      );

    if (errors.length === 0) {
      const usersProjectsRolesFound =
        await service.getUsersProjectsRolesByCompositeId(userId, projectId);

      const updatedUsersProjectsRoles = await usersProjectsRolesFound.update(
        usersProjectsRolesBody
      );
      return updatedUsersProjectsRoles;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteUsersProjectsRoles: async (userId, projectId) => {
    const usersProjectsRoles = await service.getUsersProjectsRolesByCompositeId(
      userId,
      projectId
    );

    usersProjectsRoles.destroy();
  },
};

module.exports = service;
