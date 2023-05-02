const Department = require("../models/index").Department;

const createDepartment = async (req, res, next) => {
  const name = req.body.name;

  const errors = [];

  const emptyFieldError = "field is mandatoy!";
  if (!name) {
    errors.push(`Name ${emptyFieldError}`);
  }

  if (!(name.length > 3)) {
    errors.push(`Name field must have a length greater than 3 characters!`);
  }

  if (!name.match(/^[A-Za-z\s]*$/)) {
    errors.push(`Name field must contain only letters and spaces!`);
  }

  if (errors.length === 0) {
    await Department.create({
      name: name,
    });
  } else {
    const errorMessage = `${errors.join(", ")}`;
    throw new Error(errorMessage);
  }
};

module.exports = {
  createDepartment,
};
