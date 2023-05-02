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

module.exports = { createUser };
