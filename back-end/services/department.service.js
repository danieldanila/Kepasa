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

const createDepartment = async (req, res) => {
  const errors = await departmentValidations(req.body, false);

  if (errors.length === 0) {
    await Department.create(req.body);
  } else {
    throwValidationErrorWithMessage(errors);
  }
};

const getAllDepartments = async (req, res, mext) => {
  const departments = await Department.findAll();
  return departments;
};

const getDepartmentById = async (req, res) => {
  const errors = [];

  const departmentId = idParamaterValidation(
    req.params.id,
    "Department id",
    errors
  );

  if (!uuidValidation(departmentId, "Department id", errors)) {
    throwValidationErrorWithMessage(errors);
  }

  const department = await Department.findByPk(departmentId);

  if (department) {
    return department;
  } else {
    throw new NotFoundError("Department not found.");
  }
};

const updateDepartment = async (req, res) => {
  const errors = await departmentValidations(req.body, true);

  if (errors.length === 0) {
    const departmentId = idParamaterValidation(
      req.params.id,
      "Department id",
      errors
    );
    const departmentFound = await Department.findByPk(departmentId);

    if (departmentFound) {
      const updatedDepartment = await departmentFound.update(req.body);
      return updatedDepartment;
    } else {
      throw new NotFoundError("Department not found.");
    }
  } else {
    throwValidationErrorWithMessage(errors);
  }
};

const deleteDepartment = async (req, res) => {
  const errors = [];

  const departmentId = idParamaterValidation(
    req.params.id,
    "Department id",
    errors
  );
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
