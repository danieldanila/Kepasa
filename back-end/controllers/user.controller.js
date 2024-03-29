const userService = require("../services").UserService;
const catchAsync = require("../utils/catchAsync.util");

const controller = {
  createUser: catchAsync(async (req, res, next) => {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({
      message: `User ${newUser.firstName} ${newUser.lastName} created.`,
      newUser,
    });
  }),

  createMultipleUsers: catchAsync(async (req, res, next) => {
    await userService.createMultipleUsers(req.body);
    res.status(201).json({
      message: `${req.body.length} users created.`,
    });
  }),

  getAllUsers: catchAsync(async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }),

  getAllUsersWithDepartmentAndMentorNames: catchAsync(
    async (req, res, next) => {
      const users = await userService.getAllUsersWithDepartmentAndMentorNames();
      res.status(200).json(users);
    }
  ),

  getCurrentUser: catchAsync(async (req, res, next) => {
    return res.status(200).json(res.locals.user);
  }),

  getUserById: catchAsync(async (req, res, next) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  }),

  updateUser: catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(202).json({
      data: updatedUser,
      message: `User ${updatedUser.fullName} has been updated.`,
    });
  }),

  updateMe: catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateMe(req.user, req.body);
    res.status(200).json({
      data: updatedUser,
      message: "You successfully updated your account.",
    });
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted." });
  }),

  getUserMentor: catchAsync(async (req, res, next) => {
    const userMentor = await userService.getUserMentor(req.params.id);
    res.status(200).json(userMentor);
  }),

  getUserMentees: catchAsync(async (req, res, next) => {
    const userMentees = await userService.getUserMentees(req.params.id);
    res.status(200).json(userMentees);
  }),

  getUserDepartment: catchAsync(async (req, res, next) => {
    const userDepartment = await userService.getUserDepartment(req.params.id);
    res.status(200).json(userDepartment);
  }),

  getUserObjectives: catchAsync(async (req, res, next) => {
    const userObjectives = await userService.getUserObjectives(req.params.id);
    res.status(200).json(userObjectives);
  }),

  getUserObjectiveById: catchAsync(async (req, res, next) => {
    const userObjective = await userService.getUserObjectiveById(
      req.params.id,
      req.params.idObjective
    );
    res.status(200).json(userObjective);
  }),

  getUserMenteesObjectives: catchAsync(async (req, res, next) => {
    const userMenteesObjectives = await userService.getUserMenteesObjectives(
      req.params.id
    );
    res.status(200).json(userMenteesObjectives);
  }),

  getUserMenteeObjectives: catchAsync(async (req, res, next) => {
    const userMenteeObjectives = await userService.getUserMenteeObjectives(
      req.params.id,
      req.params.idMentee
    );
    res.status(200).json(userMenteeObjectives);
  }),

  getUserMenteeObjectiveById: catchAsync(async (req, res, next) => {
    const userMenteeObjective = await userService.getUserMenteeObjectiveById(
      req.params.id,
      req.params.idMentee,
      req.params.idObjective
    );
    res.status(200).json(userMenteeObjective);
  }),

  getUserActivityReports: catchAsync(async (req, res, next) => {
    const userActivityReports = await userService.getUserActivityReports(
      req.params.id
    );
    res.status(200).json(userActivityReports);
  }),

  getUserActivityReportById: catchAsync(async (req, res, next) => {
    const userActivityReport = await userService.getUserActivityReportById(
      req.params.id,
      req.params.idActivityReport
    );
    res.status(200).json(userActivityReport);
  }),

  getUserSubUsersActivityReports: catchAsync(async (req, res, next) => {
    const userSubUsersActivityReports =
      await userService.getUserSubUsersActivityReports(req.params.id);
    res.status(200).json(userSubUsersActivityReports);
  }),
};

module.exports = controller;
