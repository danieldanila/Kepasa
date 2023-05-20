const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const rolesProjectsService = require("../services").RolesProjectsService;

const controller = {
  createRolesProjects: async (req, res) => {
    try {
      await rolesProjectsService.createRolesProjects(req.body);
      res.status(201).json({
        message: `Role ${req.body.idRole} on the ${req.body.idProject} with ${req.body.hourlyPay} hourly pay was created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleRolesProjects: async (req, res) => {
    try {
      await rolesProjectsService.createMultipleRolesProjects(req.body);
      res
        .status(201)
        .json({ message: `${req.body.length} rolesProjects created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllRolesProjects: async (req, res) => {
    try {
      const rolesProjects = await rolesProjectsService.getAllRolesProjects();
      res.status(200).json(rolesProjects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getRolesProjectsByCompositeId: async (req, res) => {
    try {
      const rolesProjects =
        await rolesProjectsService.getRolesProjectsByCompositeId(
          req.params.idRole,
          req.params.idProject
        );
      res.status(200).json(rolesProjects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateRolesProjects: async (req, res) => {
    try {
      const updatedRolesProjects =
        await rolesProjectsService.updateRolesProjects(
          req.params.idRole,
          req.params.idProject,
          req.body
        );
      res.status(202).json(updatedRolesProjects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteRolesProjects: async (req, res) => {
    try {
      await rolesProjectsService.deleteRolesProjects(
        req.params.idRole,
        req.params.idProject
      );
      res.status(200).json({ message: "Roles Projects deleted" });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getRoleProjects: async (req, res) => {
    try {
      const roleProjects = await rolesProjectsService.getRoleProjects(
        req.params.idRole
      );
      res.status(200).json(roleProjects);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getProjectRoles: async (req, res) => {
    try {
      const projectRoles = await rolesProjectsService.getProjectRoles(
        req.params.idProject
      );
      res.status(200).json(projectRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getRoleProjectHourlyPay: async (req, res) => {
    try {
      const roleProjectHourlyPay =
        await rolesProjectsService.getRoleProjectHourlyPay(
          req.params.idRole,
          req.params.idProject
        );
      res.status(200).json(roleProjectHourlyPay);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
