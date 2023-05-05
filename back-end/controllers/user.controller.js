const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    await userService.createUser(req, res, next);
    res.status(201).json({
      message: `User ${req.body.firstName} ${req.body.lastName} created.`,
    });
  } catch (err) {
    const errorMessageArray = err.message.split(", ");
    res.status(400).json({ message: errorMessageArray });
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req, res, next);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req, res, next);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req, res, next);
    if (updatedUser) {
      res.status(202).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req, res, next);
    res.status(200).json({ message: "User deleted." });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "User not found." });
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
