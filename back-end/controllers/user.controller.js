const { ValidationError } = require("../errors").ValidationError;
const userService = require("../services/user.service");
const {
  validationErrorHandler,
  serverErrorHandler,
  errorsHandlerWrapper,
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

const createMultipleUsers = async (req, res) => {
  try {
    await userService.createMultipleUsers(req.body);
    res.status(201).json({
      message: `${req.body.length} users created.`,
    });
  } catch (err) {
    errorsHandlerWrapper(res, err);
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
    errorsHandlerWrapper(res, err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(202).json(updatedUser);
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted." });
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

const getUserMentor = async (req, res) => {
  try {
    const userMentor = await userService.getUserMentor(req.params.id);
    res.status(200).json(userMentor);
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

const getUserMentees = async (req, res) => {
  try {
    const userMentees = await userService.getUserMentees(req.params.id);
    res.status(200).json(userMentees);
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

const getUserDepartment = async (req, res) => {
  try {
    const userDepartment = await userService.getUserDepartment(req.params.id);
    res.status(200).json(userDepartment);
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await userService.userLogin(req.body);
    res.status(200).json({
      message: "Succesful login.",
      details: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    errorsHandlerWrapper(res, err);
  }
};

module.exports = {
  createUser,
  createMultipleUsers,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserMentor,
  getUserMentees,
  getUserDepartment,
  userLogin,
};
