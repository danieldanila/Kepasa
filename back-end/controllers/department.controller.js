const { ValidationError } = require("../errors").ValidationError;
const departmentService = require("../services/department.service");
const { validationError, serverError } = require("./errors.controller");

const createDepartment = async (req, res, next) => {
  try {
    await departmentService.createDepartment(req, res, next);
    res.status(201).json({
      message: `Department ${req.body.name} created.`,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      validationError(res, err);
    } else {
      serverError(res, err);
    }

    next(err);
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments(
      req,
      res,
      next
    );
    res.status(200).json(departments);
  } catch (err) {
    serverError(res, err);
    next(err);
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
};
