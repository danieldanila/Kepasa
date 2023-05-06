const { NotFoundError } = require("../errors").NotFoundError;
const { ValidationError } = require("../errors").ValidationError;
const userService = require("../services/user.service");
const { serverError, validationError } = require("./errors.controller");

const createUser = async (req, res, next) => {
  try {
    await userService.createUser(req, res, next);
    res.status(201).json({
      message: `User ${req.body.firstName} ${req.body.lastName} created.`,
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req, res, next);
    res.status(200).json(users);
  } catch (err) {
    serverError(res, err);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req, res, next);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ message: err.message });
    } else {
      serverError(res, err);
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req, res, next);
    res.status(202).json(updatedUser);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ message: err.message });
    } else if (err instanceof ValidationError) {
      validationError(res, err);
    } else {
      serverError(res, err);
    }

    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req, res, next);
    res.status(200).json({ message: "User deleted." });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ message: err.message });
    } else {
      serverError(res, err);
    }
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
