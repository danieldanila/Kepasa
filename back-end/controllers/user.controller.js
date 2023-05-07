const { ValidationError } = require("../errors").ValidationError;
const userService = require("../services/user.service");
const {
  validationErrorHandler,
  serverErrorHandler,
  notFoundValidationServerErrorsWrapper,
} = require("../utils/errorsHandlers.util");

const createUser = async (req, res) => {
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
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    serverErrorHandler(res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(202).json(updatedUser);
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted." });
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

const getUserMentor = async (req, res) => {
  try {
    const userMentor = await userService.getUserMentor(req.params.id);
    res.status(200).json(userMentor);
  } catch (err) {
    notFoundValidationServerErrorsWrapper(res, err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserMentor,
};
