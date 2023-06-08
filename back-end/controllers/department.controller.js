const departmentService = require("../services").DepartmentService;
const catchAsync = require("../utils/catchAsync.util");

const controller = {
  createDepartment: catchAsync(async (req, res, next) => {
    await departmentService.createDepartment(req.body);
    res.status(201).json({
      message: `Department ${req.body.name} created.`,
    });
  }),

  createMultipleDepartments: catchAsync(async (req, res, next) => {
    await departmentService.createMultipleDepartments(req.body);
    res
      .status(201)
      .json({ message: `${req.body.length} departments created.` });
  }),

  getAllDepartments: catchAsync(async (req, res, next) => {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json(departments);
  }),

  getDepartmentById: catchAsync(async (req, res, next) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    res.status(200).json(department);
  }),

  updateDepartment: catchAsync(async (req, res, next) => {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(202).json({
      data: updatedDepartment,
      message: `Department ${updatedDepartment.name} has been updated.`,
    });
  }),

  deleteDepartment: catchAsync(async (req, res, next) => {
    await departmentService.deleteDepartment(req.params.id);
    res.status(200).json({ message: "Department deleted." });
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

  getDepartmentUsersRoles: catchAsync(async (req, res, next) => {
    const departmentUsersRoles =
      await departmentService.getDepartmentUsersRoles(req.params.id);
    res.status(200).json(departmentUsersRoles);
  }),
};

module.exports = controller;
