const { ValidationError } = require("../errors").ValidationError;
const departmentService = require("../services").DepartmentService;
const {
  validationErrorHandler,
  serverErrorHandler,
  errorsHandlerWrapper,
} = require("../utils/errorsHandlers.util");

const controller = {
  createDepartment: async (req, res) => {
    try {
      await departmentService.createDepartment(req.body);
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
  },

  createMultipleDepartments: async (req, res) => {
    try {
      await departmentService.createMultipleDepartments(req.body);
      res
        .status(201)
        .json({ message: `${req.body.length} departments created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllDepartments: async (req, res) => {
    try {
      const departments = await departmentService.getAllDepartments();
      res.status(200).json(departments);
    } catch (err) {
      serverErrorHandler(res, err);
    }
  },

  getDepartmentById: async (req, res) => {
    try {
      const department = await departmentService.getDepartmentById(
        req.params.id
      );
      res.status(200).json(department);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateDepartment: async (req, res) => {
    try {
      const updatedDepartment = await departmentService.updateDepartment(
        req.params.id,
        req.body
      );
      res.status(202).json(updatedDepartment);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteDepartment: async (req, res) => {
    try {
      await departmentService.deleteDepartment(req.params.id);
      res.status(200).json({ message: "Department deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getDepartmentUsers: async (req, res) => {
    try {
      const departmentUsers = await departmentService.getDepartmentUsers(
        req.params.id
      );
      res.status(200).json(departmentUsers);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
