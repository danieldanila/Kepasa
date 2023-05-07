const { ValidationError } = require("../errors").ValidationError;
const departmentService = require("../services/department.service");
const {
  validationErrorHandler,
  serverErrorHandler,
  notFoundValidationServerErrorsWrapper,
} = require("../utils/errorsHandlers.util");

const createDepartment = async (req, res) => {
  try {
    await departmentService.createDepartment(req, res);
    res.status(201).json({
      message: `Department ${req.body.name} created.`,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      validationErrorHandler(res, err);
    } else {
      serverErrorHandler(res, err);
    }
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments(req, res);
    res.status(200).json(departments);
  } catch (err) {
    serverErrorHandler(res, err);
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req, res);
    res.status(200).json(department);
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req,
      res
    );
    res.status(202).json(updatedDepartment);
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    await departmentService.deleteDepartment(req, res);
    res.status(200).json({ message: "Department deleted." });
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
