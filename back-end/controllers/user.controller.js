const userService = require("../services").UserService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createUser: async (req, res) => {
    try {
      await userService.createUser(req.body);
      res.status(201).json({
        message: `User ${req.body.firstName} ${req.body.lastName} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleUsers: async (req, res) => {
    try {
      await userService.createMultipleUsers(req.body);
      res.status(201).json({
        message: `${req.body.length} users created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(202).json({
        data: updatedUser,
        message: `User ${updatedUser.fullName} has been updated.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserMentor: async (req, res) => {
    try {
      const userMentor = await userService.getUserMentor(req.params.id);
      res.status(200).json(userMentor);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserMentees: async (req, res) => {
    try {
      const userMentees = await userService.getUserMentees(req.params.id);
      res.status(200).json(userMentees);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserDepartment: async (req, res) => {
    try {
      const userDepartment = await userService.getUserDepartment(req.params.id);
      res.status(200).json(userDepartment);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserObjectives: async (req, res) => {
    try {
      const userObjectives = await userService.getUserObjectives(req.params.id);
      res.status(200).json(userObjectives);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserObjectiveById: async (req, res) => {
    try {
      const userObjective = await userService.getUserObjectiveById(
        req.params.id,
        req.params.idObjective
      );
      res.status(200).json(userObjective);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserMenteesObjectives: async (req, res) => {
    try {
      const userMenteesObjectives = await userService.getUserMenteesObjectives(
        req.params.id
      );
      res.status(200).json(userMenteesObjectives);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserMenteeObjectives: async (req, res) => {
    try {
      const userMenteeObjectives = await userService.getUserMenteeObjectives(
        req.params.id,
        req.params.idMentee
      );
      res.status(200).json(userMenteeObjectives);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserMenteeObjectiveById: async (req, res) => {
    try {
      const userMenteeObjective = await userService.getUserMenteeObjectiveById(
        req.params.id,
        req.params.idMentee,
        req.params.idObjective
      );
      res.status(200).json(userMenteeObjective);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserActivityReports: async (req, res) => {
    try {
      const userActivityReports = await userService.getUserActivityReports(
        req.params.id
      );
      res.status(200).json(userActivityReports);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserActivityReportById: async (req, res) => {
    try {
      const userActivityReport = await userService.getUserActivityReportById(
        req.params.id,
        req.params.idActivityReport
      );
      res.status(200).json(userActivityReport);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getUserSubUsersActivityReports: async (req, res) => {
    try {
      const userSubUsersActivityReports =
        await userService.getUserSubUsersActivityReports(req.params.id);
      res.status(200).json(userSubUsersActivityReports);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
