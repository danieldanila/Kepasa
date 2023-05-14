const { idParamaterValidation } = require("../validations/general.validation");
const departmentValidations = require("../validations").DepartmentValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { NotFoundError } = require("../errors").NotFoundError;

const Department = require("../models").Department;
const User = require("../models").User;

const service = {
  createDepartment: async (departmentBody) => {
    const existingDepartments = await service.getAllDepartments();
    const errors = await departmentValidations.checkDepartmentFields(
      departmentBody,
      existingDepartments,
      false
    );

    if (errors.length === 0) {
      await Department.create(departmentBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleDepartments: async (arrayOfDepartmentsBodies) => {
    for (const departmentBody of arrayOfDepartmentsBodies) {
      await service.createDepartment(departmentBody);
    }
  },

  getAllDepartments: async () => {
    const departments = await Department.findAll();
    return departments;
  },

  getDepartmentById: async (departmentId) => {
    const errors = [];

    idParamaterValidation(departmentId, "Department id", errors);

    const department = await Department.findByPk(departmentId);

    if (department) {
      return department;
    } else {
      throw new NotFoundError("Department not found.");
    }
  },

  updateDepartment: async (departmentId, departmentBody) => {
    const existingDepartments = await service.getAllDepartments();
    const errors = await departmentValidations.checkDepartmentFields(
      departmentBody,
      existingDepartments,
      true
    );

    if (errors.length === 0) {
      idParamaterValidation(departmentId, "Department id", errors);
      const departmentFound = await Department.findByPk(departmentId);

      if (departmentFound) {
        const updatedDepartment = await departmentFound.update(departmentBody);
        return updatedDepartment;
      } else {
        throw new NotFoundError("Department not found.");
      }
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteDepartment: async (departmentId) => {
    const errors = [];

    idParamaterValidation(departmentId, "Department id", errors);
    const department = await Department.findByPk(departmentId);

    if (department) {
      department.destroy();
    } else {
      throw new NotFoundError("Department not found.");
    }
  },

  getDepartmentUsers: async (departmentId) => {
    const errors = [];
    idParamaterValidation(departmentId, "Department id", errors);

    const departmentUsers = await Department.findOne({
      where: {
        id: departmentId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (departmentUsers) {
      return departmentUsers.Users;
    } else {
      throw new NotFoundError("Department not found.");
    }
  },
};

module.exports = service;
