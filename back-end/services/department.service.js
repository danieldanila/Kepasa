const { ValidationError } = require("../errors").ValidationError;
const { nameValidation } = require("./validations.service");

const Department = require("../models/index").Department;

const createDepartment = async (req, res, next) => {
  const errors = await departmentValidations(req.body);

  if (errors.length === 0) {
    await Department.create(req.body);
  } else {
    const errorMessage = `${errors.join("### ")}`;
    throw new ValidationError(errorMessage);
  }
};

const getAllDepartments = async (req, res, mext) => {
  const departments = await Department.findAll();
  return departments;
};

const departmentValidations = async (department) => {
  const errors = [];
  nameValidation(department.name, "Name", errors);

  const allDepartments = await getAllDepartments();

  if (allDepartments.length > 0) {
    allDepartments.forEach((existingDepartment) => {
      if (existingDepartment.name === department.name) {
        errors.push("The department name already exists.");
      }
    });
  }

  return errors;
};

module.exports = {
  createDepartment,
  getAllDepartments,
};
