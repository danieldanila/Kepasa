const {
  nameValidation,
  validateCompletedField,
  duplicateFieldValidation,
  uuidValidation,
  idParamaterValidation,
} = require("../utils/validations.util");
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const { NotFoundError } = require("../errors").NotFoundError;

const Department = require("../models/index").Department;

const createDepartment = async (departmentBody) => {
  const errors = await departmentValidations(departmentBody, false);

  if (errors.length === 0) {
    await Department.create(departmentBody);
  } else {
    throwValidationErrorWithMessage(errors);
  }
};

const getAllDepartments = async () => {
  const departments = await Department.findAll();
  return departments;
};

const getDepartmentById = async (departmentId) => {
  const errors = [];

  idParamaterValidation(departmentId, "Department id", errors);

  const department = await Department.findByPk(departmentId);

  if (department) {
    return department;
  } else {
    throw new NotFoundError("Department not found.");
  }
};

const updateDepartment = async (departmentId, departmentBody) => {
  const errors = await departmentValidations(departmentBody, true);

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
};

const deleteDepartment = async (departmentId) => {
  const errors = [];

  idParamaterValidation(departmentId, "Department id", errors);
  const department = await Department.findByPk(departmentId);

  if (department) {
    department.destroy();
  } else {
    throw new NotFoundError("Department not found.");
  }
};

const departmentValidations = async (department, isUpdateRequest) => {
  const errors = [];
  validateCompletedField(
    nameValidation,
    department.name,
    "Name",
    errors,
    isUpdateRequest
  );

  const existingDepartments = await getAllDepartments();

  if (existingDepartments.length > 0) {
    duplicateFieldValidation(
      department.name,
      "Department name",
      errors,
      existingDepartments,
      "name"
    );
  }

  return errors;
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
