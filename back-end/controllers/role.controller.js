const roleService = require("../services").RoleService;
const catchAsync = require("../utils/catchAsync.util");

const controller = {
  createRole: catchAsync(async (req, res, next) => {
    await roleService.createRole(req.body);
    res.status(201).json({
      message: `Role ${req.body.name} created.`,
    });
  }),

  createMultipleRoles: catchAsync(async (req, res, next) => {
    await roleService.createMultipleRoles(req.body);
    res.status(201).json({ message: `${req.body.length} roles created.` });
  }),

  getAllRoles: catchAsync(async (req, res, next) => {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  }),

  getRoleById: catchAsync(async (req, res, next) => {
    const role = await roleService.getRoleById(req.params.id);
    res.status(200).json(role);
  }),

  updateRole: catchAsync(async (req, res, next) => {
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.status(202).json(updatedRole);
  }),

  deleteRole: catchAsync(async (req, res, next) => {
    await roleService.deleteRole(req.params.id);
    res.status(200).json({ message: "Role deleted." });
  }),

  getRoleDepartment: catchAsync(async (req, res, next) => {
    const roleDepartment = await roleService.getRoleDepartment(req.params.id);
    res.status(200).json(roleDepartment);
  }),

  getRoleSuperiorRole: catchAsync(async (req, res, next) => {
    const roleSuperiorRole = await roleService.getRoleSuperiorRole(
      req.params.id
    );
    res.status(200).json(roleSuperiorRole);
  }),

  getRoleSubRoles: catchAsync(async (req, res, next) => {
    const roleSubRoles = await roleService.getRoleSubRoles(req.params.id);
    res.status(200).json(roleSubRoles);
  }),
};

module.exports = controller;
