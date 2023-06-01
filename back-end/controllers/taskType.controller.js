const catchAsync = require("../utils/catchAsync.util");

const taskTypeService = require("../services").TaskTypeService;

const controller = {
  createTaskType: catchAsync(async (req, res, next) => {
    await taskTypeService.createTaskType(req.body);
    res.status(201).json({
      message: `Task Type ${req.body.name} created.`,
    });
  }),

  createMultipleTaskTypes: catchAsync(async (req, res, next) => {
    await taskTypeService.createMultipleTaskTypes(req.body);
    res.status(201).json({ message: `${req.body.length} task types created.` });
  }),

  getAllTaskTypes: catchAsync(async (req, res, next) => {
    const taskTypes = await taskTypeService.getAllTaskTypes();
    res.status(200).json(taskTypes);
  }),

  getTaskTypeById: catchAsync(async (req, res, next) => {
    const taskType = await taskTypeService.getTaskTypeById(req.params.id);
    res.status(200).json(taskType);
  }),

  updateTaskType: catchAsync(async (req, res, next) => {
    const updatedTaskType = await taskTypeService.updateTaskType(
      req.params.id,
      req.body
    );
    res.status(202).json(updatedTaskType);
  }),

  deleteTaskType: catchAsync(async (req, res, next) => {
    await taskTypeService.deleteTaskType(req.params.id);
    res.status(200).json({ message: "Task Type deleted." });
  }),

  getDepartmentUsers: catchAsync(async (req, res, next) => {
    const departmentUsers = await departmentService.getDepartmentUsers(
      req.params.id
    );
    res.status(200).json(departmentUsers);
  }),

  getDeparmentRoles: catchAsync(async (req, res, next) => {
    const departmentRoles = await departmentService.getDepartmentRoles(
      req.params.id
    );
    res.status(200).json(departmentRoles);
  }),

  getTaskTypeActivityReports: catchAsync(async (req, res, next) => {
    const taskTypeActivityReports =
      await taskTypeService.getTaskTypeActivityReports(req.params.id);
    res.status(200).json(taskTypeActivityReports);
  }),

  getTaskTypeActivityReportById: catchAsync(async (req, res, next) => {
    const taskTypeActivityReport =
      await taskTypeService.getTaskTypeActivityReportById(
        req.params.id,
        req.params.idActivityReport
      );
    res.status(200).json(taskTypeActivityReport);
  }),
};

module.exports = controller;
