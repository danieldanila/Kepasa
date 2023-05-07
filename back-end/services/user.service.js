const {
  validateCompletedField,
  nameValidation,
  emailValidation,
  phoneValidation,
  urlValidation,
  passwordValidation,
  birthdayValidation,
  foreignUuidValidation,
  duplicateFieldValidation,
  booleanFieldValidation,
} = require("./validations.service");

const { ValidationError } = require("../errors").ValidationError;
const { NotFoundError } = require("../errors").NotFoundError;

const User = require("../models/index").User;
const departmentService = require("./index").departmentService;

const createUser = async (req, res, next) => {
  const errors = await userValidations(req.body, false);

  if (errors.length === 0) {
    await User.create(req.body);
  } else {
    const errorMessage = `${errors.join("### ")}`;
    throw new ValidationError(errorMessage);
  }
};

const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    return user;
  } else {
    throw new NotFoundError("User not found");
  }
};

const updateUser = async (req, res, next) => {
  const errors = await userValidations(req.body, true);

  if (errors.length === 0) {
    const userId = req.params.id;
    const userFound = await User.findByPk(userId);

    if (userFound) {
      const updatedUser = await userFound.update(req.body);
      return updatedUser;
    } else {
      throw new NotFoundError("User not found.");
    }
  } else {
    const errorMessage = `${errors.join("### ")}`;
    throw new ValidationError(errorMessage);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    user.destroy();
  } else {
    throw new NotFoundError("User not found.");
  }
};

const userValidations = async (user, isUpdateRequest) => {
  const errors = [];

  validateCompletedField(
    emailValidation,
    user.email,
    "Email",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    phoneValidation,
    user.phone,
    "Phone",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    urlValidation,
    user.socialMediaLink,
    "Social media link",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    passwordValidation,
    user.password,
    "Password",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    nameValidation,
    user.firstName,
    "First name",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    nameValidation,
    user.lastName,
    "Last name",
    errors,
    isUpdateRequest
  );
  validateCompletedField(
    birthdayValidation,
    user.birthday,
    "Birthday",
    errors,
    isUpdateRequest
  );

  const existingDepartments = await departmentService.getAllDepartments();

  validateCompletedField(
    foreignUuidValidation,
    user.idDepartment,
    "Department id",
    errors,
    isUpdateRequest,
    existingDepartments
  );

  const existingUsers = await getAllUsers();

  if (existingUsers.length > 0) {
    validateCompletedField(
      foreignUuidValidation,
      user.idMentor,
      "Mentor id",
      errors,
      isUpdateRequest,
      existingUsers
    );

    duplicateFieldValidation(
      user.email,
      "Email",
      errors,
      existingUsers,
      "email"
    );

    duplicateFieldValidation(
      user.phone,
      "Phone",
      errors,
      existingUsers,
      "phone"
    );

    duplicateFieldValidation(
      user.socialMediaLink,
      "Social media link",
      errors,
      existingUsers,
      "socialMediaLink"
    );
  } else {
    user.idMentor = null;
  }

  booleanFieldValidation(user.isActive, "Is Active", errors);
  booleanFieldValidation(user.isAdministrator, "Is Administrator", errors);

  return errors;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
