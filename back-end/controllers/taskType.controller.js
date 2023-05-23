const taskTypeService = require("../services").TaskTypeService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createTaskType: async (req, res) => {
    try {
      await taskTypeService.createTaskType(req.body);
      res.status(201).json({
        message: `Task Type ${req.body.name} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleTaskTypes: async (req, res) => {
    try {
      await taskTypeService.createMultipleTaskTypes(req.body);
      res
        .status(201)
        .json({ message: `${req.body.length} task types created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllTaskTypes: async (req, res) => {
    try {
      const taskTypes = await taskTypeService.getAllTaskTypes();
      res.status(200).json(taskTypes);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getTaskTypeById: async (req, res) => {
    try {
      const taskType = await taskTypeService.getTaskTypeById(req.params.id);
      res.status(200).json(taskType);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateTaskType: async (req, res) => {
    try {
      const updatedTaskType = await taskTypeService.updateTaskType(
        req.params.id,
        req.body
      );
      res.status(202).json(updatedTaskType);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteTaskType: async (req, res) => {
    try {
      await taskTypeService.deleteTaskType(req.params.id);
      res.status(200).json({ message: "Task Type deleted." });
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

  getDeparmentRoles: async (req, res) => {
    try {
      const departmentRoles = await departmentService.getDepartmentRoles(
        req.params.id
      );
      res.status(200).json(departmentRoles);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getTaskTypeActivityReports: async (req, res) => {
    try {
      const taskTypeActivityReports =
        await taskTypeService.getTaskTypeActivityReports(req.params.id);
      res.status(200).json(taskTypeActivityReports);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getTaskTypeActivityReportById: async (req, res) => {
    try {
      const taskTypeActivityReport =
        await taskTypeService.getTaskTypeActivityReportById(
          req.params.id,
          req.params.idActivityReport
        );
      res.status(200).json(taskTypeActivityReport);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
