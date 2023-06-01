const projectService = require("../services").ProjectService;
const catchAsync = require("../utils/catchAsync.util");

const controller = {
  createProject: catchAsync(async (req, res, next) => {
    await projectService.createProject(req.body);
    res.status(201).json({
      message: `Project ${req.body.name} created.`,
    });
  }),

  createMultipleProjects: catchAsync(async (req, res, next) => {
    await projectService.createMultipleProjects(req.body);
    res.status(201).json({ message: `${req.body.length} projects created.` });
  }),

  getAllProjects: catchAsync(async (req, res, next) => {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  }),

  getProjectById: catchAsync(async (req, res, next) => {
    const project = await projectService.getProjectById(req.params.id);
    res.status(200).json(project);
  }),

  updateProject: catchAsync(async (req, res, next) => {
    const updatedProject = await projectService.updateProject(
      req.params.id,
      req.body
    );

    res.status(202).json({
      data: updatedProject,
      message: `Project ${updatedProject.name} has been updated.`,
    });
  }),

  deleteProject: catchAsync(async (req, res, next) => {
    await projectService.deleteProject(req.params.id);
    res.status(200).json({ message: "Project deleted." });
  }),

  getProjectActivityReports: catchAsync(async (req, res, next) => {
    const projectActivityReports =
      await projectService.getProjectActivityReports(req.params.id);
    res.status(200).json(projectActivityReports);
  }),

  getProjectActivityReportById: catchAsync(async (req, res, next) => {
    const projectActivityReport =
      await projectService.getProjectActivityReportById(
        req.params.id,
        req.params.idActivityReport
      );
    res.status(200).json(projectActivityReport);
  }),
};

module.exports = controller;
