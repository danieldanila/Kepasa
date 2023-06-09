const { idParamaterValidation } = require("../validations/general.validation");
const usersProjectsRolesValidation =
  require("../validations").UsersProjectsRolesValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const { NotFoundError } = require("../errors");

const UsersProjectsRoles = require("../models").UsersProjectsRoles;
const Project = require("../models").Project;
const User = require("../models").User;
const Role = require("../models").Role;

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
    const usersProjectsRoles = await UsersProjectsRoles.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Project,
        },
        {
          model: Role,
        },
      ],
    });
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

  getUserProjects: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const userProjects = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Project,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (userProjects) {
      return userProjects.Projects;
    } else {
      throw new NotFoundError("User not found.");
    }
  },

  getProjectUsers: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const projectUsers = await Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        {
          model: User,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (projectUsers) {
      return projectUsers.Users;
    } else {
      throw new NotFoundError("Project not found.");
    }
  },

  getUserRoleOnProject: async (userId, projectId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);
    idParamaterValidation(projectId, "Project id", errors);

    const userRoleOnProject = await UsersProjectsRoles.findOne({
      where: {
        idUser: userId,
        idProject: projectId,
      },
      include: [
        {
          model: Role,
        },
      ],
    });

    if (userRoleOnProject) {
      return userRoleOnProject.Role;
    } else {
      throw new NotFoundError("User on given project not found.");
    }
  },

  getUserRoleOnDepartmentProject: async (userId) => {
    const userroleOnDepartmentProject = await service.getUserRoleOnProject(
      userId,
      process.env.DEPARTMENT_PROJECT_ID
    );

    if (userroleOnDepartmentProject) {
      return userroleOnDepartmentProject;
    } else {
      throw new NotFoundError("User on given project not found.");
    }
  },

  getUserRolesOnProjects: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const usersProjectsRolesWithUserId = await UsersProjectsRoles.findAll({
      where: {
        idUser: userId,
      },
    });

    const userRoles = await Promise.all(
      usersProjectsRolesWithUserId.map(async (userRole) => {
        const project = await Project.findByPk(userRole.idProject);
        const role = await Role.findByPk(userRole.idRole);

        const nestedJson = {
          Project: project,
          Role: role,
        };

        return nestedJson;
      })
    );

    return userRoles;
  },

  getRoleUsersOnProjects: async (roleId) => {
    const errors = [];

    idParamaterValidation(roleId, "Role id", errors);

    const usersProjectsRolesWithRoleId = await UsersProjectsRoles.findAll({
      where: {
        idRole: roleId,
      },
    });

    const roleUsers = await Promise.all(
      usersProjectsRolesWithRoleId.map(async (roleUser) => {
        const user = await User.findByPk(roleUser.idUser);
        const project = await Project.findByPk(roleUser.idProject);

        const nestedJson = {
          User: user,
          Project: project,
        };

        return nestedJson;
      })
    );

    return roleUsers;
  },

  getProjectRolesWithUsers: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const usersProjectsRolesWithRoleId = await UsersProjectsRoles.findAll({
      where: {
        idProject: projectId,
      },
    });

    const projectRolesWithUsers = await Promise.all(
      usersProjectsRolesWithRoleId.map(async (projectRole) => {
        const user = await User.findByPk(projectRole.idUser);
        const role = await Role.findByPk(projectRole.idRole);

        const nestedJson = {
          User: user,
          Role: role,
        };

        return nestedJson;
      })
    );

    return projectRolesWithUsers;
  },
};

module.exports = service;
