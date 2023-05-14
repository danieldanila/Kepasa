const roleValidations = require("../validations").RoleValidation;

const { NotFoundError } = require("../errors").NotFoundError;
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const Role = require("../models").Role;

const getAllDepartments = require("./department.service").getAllDepartments;

const service = {
  createRole: async (roleBody) => {
    const existingRoles = await service.getAllRoles();
    const existingDepartments = await getAllDepartments();
    const errors = await roleValidations.checkRoleFields(
      roleBody,
      existingRoles,
      existingDepartments,
      false
    );

    if (errors.length === 0) {
      await Role.create(roleBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleRoles: async (arrayOfRolesBodies) => {
    for (const roleBody of arrayOfRolesBodies) {
      await service.createRole(roleBody);
    }
  },

  getAllRoles: async () => {
    const roles = await Role.findAll();
    return roles;
  },

  getRoleById: async (roleId) => {
    const errors = [];

    idParamaterValidation(roleId, "Role id", errors);

    const role = await Role.findByPk(roleId);

    if (role) {
      return role;
    } else {
      throw new NotFoundError("Role not found.");
    }
  },

  updateRole: async (roleId, roleBody) => {
    const existingRoles = await service.getAllRoles();
    const existingDepartments = await getAllDepartments();
    const errors = await roleValidations.checkRoleFields(
      roleBody,
      existingRoles,
      existingDepartments,
      true
    );

    if (errors.length === 0) {
      idParamaterValidation(roleId, "Role id", errors);
      const roleFound = await Role.findByPk(roleId);

      if (roleFound) {
        const updatedRole = await roleFound.update(roleBody);
        return updatedRole;
      } else {
        throw new NotFoundError("Role not found.");
      }
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteRole: async (roleId) => {
    const errors = [];

    idParamaterValidation(roleId, "Role id", errors);
    const role = await Role.findByPk(roleId);

    if (role) {
      role.destroy();
    } else {
      throw new NotFoundError("Role not found.");
    }
  },
};

module.exports = service;
