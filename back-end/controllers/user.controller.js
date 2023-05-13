const { ValidationError } = require("../errors").ValidationError;
const userService = require("../services").UserService;
const {
  validationErrorHandler,
  serverErrorHandler,
  errorsHandlerWrapper,
} = require("../utils/errorsHandlers.util");

const controller = {
  createUser: async (req, res) => {
    try {
      await userService.createUser(req.body);
      res.status(201).json({
        message: `User ${req.body.firstName} ${req.body.lastName} created.`,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        validationErrorHandler(res, err);
      } else {
        serverErrorHandler(res, err);
      }
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
      serverErrorHandler(res, err);
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
      res.status(202).json(updatedUser);
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
};

module.exports = controller;
