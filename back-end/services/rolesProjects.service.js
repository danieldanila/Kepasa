const { idParamaterValidation } = require("../validations/general.validation");
const rolesProjectsValidation =
  require("../validations").RolesProjectsValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const { NotFoundError } = require("../errors");

const Project = require("../models").Project;
const Role = require("../models").Role;
const RolesProjects = require("../models").RolesProjects;

const getAllProjects = require("./project.service").getAllProjects;
const getAllRoles = require("./role.service").getAllRoles;

const service = {
  createRolesProjects: async (rolesProjectsBody) => {
    const existingRolesProjects = await service.getAllRolesProjects();
    const existingRoles = await getAllRoles();
    const existingProjects = await getAllProjects();
    const errors = await rolesProjectsValidation.checkRolesProjectsFields(
      rolesProjectsBody,
      existingRolesProjects,
      existingRoles,
      existingProjects,
      false
    );

    if (errors.length === 0) {
      await RolesProjects.create(rolesProjectsBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleRolesProjects: async (arrayOfRolesProjectsBodies) => {
    for (const rolesProjectsBody of arrayOfRolesProjectsBodies) {
      await service.createRolesProjects(rolesProjectsBody);
    }
  },

  getAllRolesProjects: async () => {
    const rolesProjects = await RolesProjects.findAll({
      include: [
        {
          model: Role,
        },
        {
          model: Project,
        },
      ],
    });
    return rolesProjects;
  },

  getRolesProjectsByCompositeId: async (roleId, projectId) => {
    const errors = [];

    idParamaterValidation(roleId, "Role id", errors);
    idParamaterValidation(projectId, "Project id", errors);

    const rolesProjects = await RolesProjects.findOne({
      where: {
        idRole: roleId,
        idProject: projectId,
      },
    });

    if (rolesProjects) {
      return rolesProjects;
    } else {
      throw new NotFoundError("Roles Projects not found.");
    }
  },

  updateRolesProjects: async (roleId, projectId, rolesProjectsBody) => {
    const existingRolesProjects = await service.getAllRolesProjects();
    const existingRoles = await getAllRoles();
    const existingProjects = await getAllProjects();
    const errors = await rolesProjectsValidation.checkRolesProjectsFields(
      rolesProjectsBody,
      existingRolesProjects,
      existingRoles,
      existingProjects,
      true
    );

    if (errors.length === 0) {
      const rolesProjectsFound = await service.getRolesProjectsByCompositeId(
        roleId,
        projectId
      );

      const updatedRolesProjects = await rolesProjectsFound.update(
        rolesProjectsBody
      );

      return updatedRolesProjects;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteRolesProjects: async (roleId, projectId) => {
    const rolesProjects = await service.getRolesProjectsByCompositeId(
      roleId,
      projectId
    );

    rolesProjects.destroy();
  },

  getRoleProjects: async (roleId) => {
    const errors = [];
    idParamaterValidation(roleId, "Role id", errors);

    const roleProjects = await Role.findOne({
      where: {
        id: roleId,
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

    if (roleProjects) {
      return roleProjects.Projects;
    } else {
      throw new NotFoundError("Role not found.");
    }
  },

  getProjectRoles: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const projectRoles = await Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        {
          model: Role,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (projectRoles) {
      return projectRoles.Roles;
    } else {
      throw new NotFoundError("Project not found.");
    }
  },

  getRoleProjectHourlyPay: async (roleId, projectId) => {
    const rolesProject = await service.getRolesProjectsByCompositeId(
      roleId,
      projectId
    );

    return rolesProject.hourlyPay;
  },
};

module.exports = service;
