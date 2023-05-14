const roleService = require("../services").RoleService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createRole: async (req, res) => {
    try {
      await roleService.createRole(req.body);
      res.status(201).json({
        message: `Role ${req.body.name} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleRoles: async (req, res) => {
    try {
      await roleService.createMultipleRoles(req.body);
      res.status(201).json({ message: `${req.body.length} roles created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await roleService.getRoleById(req.params.id);
      res.status(200).json(role);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateRole: async (req, res) => {
    try {
      const updatedRole = await roleService.updateRole(req.params.id, req.body);
      res.status(202).json(updatedRole);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteRole: async (req, res) => {
    try {
      await roleService.deleteRole(req.params.id);
      res.status(200).json({ message: "Role deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
