const projectValidation = require("../validations").ProjectValidation;

const { NotFoundError } = require("../errors").NotFoundError;
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const Project = require("../models").Project;

const service = {
  createProject: async (projectBody) => {
    const existingProjects = await service.getAllProjects();
    const errors = await projectValidation.checkProjectFieds(
      projectBody,
      existingProjects,
      false
    );

    if (errors.length === 0) {
      await Project.create(projectBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleProjects: async (arrayOfProjectsBodies) => {
    for (const projectBody of arrayOfProjectsBodies) {
      await service.createProject(projectBody);
    }
  },

  getAllProjects: async () => {
    const projects = await Project.findAll();
    return projects;
  },

  getProjectById: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const project = await Project.findByPk(projectId);

    if (project) {
      return project;
    } else {
      throw new NotFoundError("Project not found.");
    }
  },

  updateProject: async (projectId, projectBody) => {
    const existingProjects = await service.getAllProjects();
    const errors = await projectValidation.checkProjectFieds(
      projectBody,
      existingProjects,
      true
    );

    if (errors.length === 0) {
      idParamaterValidation(projectId, "Project id", errors);
      const projectFound = await Project.findByPk(projectId);

      if (projectFound) {
        const updatedProject = await projectFound.update(projectBody);
        return updatedProject;
      } else {
        throw NotFoundError("Project not found.");
      }
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteProject: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);
    const project = await Project.findByPk(projectId);

    if (project) {
      project.destroy();
    } else {
      throw new NotFoundError("Project not found.");
    }
  },
};

module.exports = service;
