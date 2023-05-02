const departmentService = require("../services/department.service");

const createDepartment = async (req, res, next) => {
  try {
    await departmentService.createDepartment(req, res, next);
    res.status(201).json({
      message: `Department ${req.body.name} created.`,
    });
  } catch (err) {
    const errorMessageArray = err.message.split(", ");
    res.status(400).json({ message: errorMessageArray });
    next(err);
  }
};

module.exports = {
  createDepartment,
};
