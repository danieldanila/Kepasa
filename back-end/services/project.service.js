const projectValidation = require("../validations").ProjectValidation;

const { NotFoundError } = require("../errors");
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const Project = require("../models").Project;
const ActivityReport = require("../models").ActivityReport;

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
      const projectFound = await service.getProjectById(projectId);
      const updatedProject = await projectFound.update(projectBody);
      return updatedProject;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteProject: async (projectId) => {
    const project = await service.getProjectById(projectId);

    project.destroy();
  },

  getProjectActivityReports: async (projectId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const project = await Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        {
          model: ActivityReport,
        },
      ],
    });

    if (project) {
      return project.ActivityReports;
    } else {
      throw new NotFoundError("Project not found");
    }
  },

  getProjectActivityReportById: async (projectId, activityReportId) => {
    const errors = [];

    idParamaterValidation(projectId, "Project id", errors);

    const project = await Project.findOne({
      where: {
        id: projectId,
      },
      include: [
        {
          model: ActivityReport,
          where: {
            id: activityReportId,
          },
        },
      ],
    });

    if (project) {
      return project.ActivityReports[0];
    } else {
      throw new NotFoundError(
        "Project with the the specific activity report not found"
      );
    }
  },
};

module.exports = service;
