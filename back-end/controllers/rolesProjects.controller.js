const catchAsync = require("../utils/catchAsync.util");

const rolesProjectsService = require("../services").RolesProjectsService;

const controller = {
  createRolesProjects: catchAsync(async (req, res, next) => {
    await rolesProjectsService.createRolesProjects(req.body);
    res.status(201).json({
      message: `Role ${req.body.idRole} on the ${req.body.idProject} with ${req.body.hourlyPay} hourly pay was created.`,
    });
  }),

  createMultipleRolesProjects: catchAsync(async (req, res, next) => {
    await rolesProjectsService.createMultipleRolesProjects(req.body);
    res
      .status(201)
      .json({ message: `${req.body.length} rolesProjects created.` });
  }),

  getAllRolesProjects: catchAsync(async (req, res, next) => {
    const rolesProjects = await rolesProjectsService.getAllRolesProjects();
    res.status(200).json(rolesProjects);
  }),

  getRolesProjectsByCompositeId: catchAsync(async (req, res, next) => {
    const rolesProjects =
      await rolesProjectsService.getRolesProjectsByCompositeId(
        req.params.idRole,
        req.params.idProject
      );
    res.status(200).json(rolesProjects);
  }),

  updateRolesProjects: catchAsync(async (req, res, next) => {
    const updatedRolesProjects = await rolesProjectsService.updateRolesProjects(
      req.params.idRole,
      req.params.idProject,
      req.body
    );
    res.status(202).json(updatedRolesProjects);
  }),

  deleteRolesProjects: catchAsync(async (req, res, next) => {
    await rolesProjectsService.deleteRolesProjects(
      req.params.idRole,
      req.params.idProject
    );
    res.status(200).json({ message: "Roles Projects deleted" });
  }),

  getRoleProjects: catchAsync(async (req, res, next) => {
    const roleProjects = await rolesProjectsService.getRoleProjects(
      req.params.idRole
    );
    res.status(200).json(roleProjects);
  }),

  getProjectRoles: catchAsync(async (req, res, next) => {
    const projectRoles = await rolesProjectsService.getProjectRoles(
      req.params.idProject
    );
    res.status(200).json(projectRoles);
  }),

  getRoleProjectHourlyPay: catchAsync(async (req, res, next) => {
    const roleProjectHourlyPay =
      await rolesProjectsService.getRoleProjectHourlyPay(
        req.params.idRole,
        req.params.idProject
      );
    res.status(200).json(roleProjectHourlyPay);
  }),
};

module.exports = controller;
