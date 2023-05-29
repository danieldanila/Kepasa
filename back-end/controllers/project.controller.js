const projectService = require("../services").ProjectService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createProject: async (req, res) => {
    try {
      await projectService.createProject(req.body);
      res.status(201).json({
        message: `Project ${req.body.name} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleProjects: async (req, res) => {
    try {
      await projectService.createMultipleProjects(req.body);
      res.status(201).json({ message: `${req.body.length} projects created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectById: async (req, res) => {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateProject: async (req, res) => {
    try {
      const updatedProject = await projectService.updateProject(
        req.params.id,
        req.body
      );

      res.status(202).json({
        data: updatedProject,
        message: `Project ${updatedProject.name} has been updated.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteProject: async (req, res) => {
    try {
      await projectService.deleteProject(req.params.id);
      res.status(200).json({ message: "Project deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectActivityReports: async (req, res) => {
    try {
      const projectActivityReports =
        await projectService.getProjectActivityReports(req.params.id);
      res.status(200).json(projectActivityReports);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectActivityReportById: async (req, res) => {
    try {
      const projectActivityReport =
        await projectService.getProjectActivityReportById(
          req.params.id,
          req.params.idActivityReport
        );
      res.status(200).json(projectActivityReport);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
