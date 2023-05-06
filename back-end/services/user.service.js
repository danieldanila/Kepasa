const {
  validateCompletedField,
  nameValidation,
  emailValidation,
  phoneValidation,
  urlValidation,
  passwordValidation,
  birthdayValidation,
  uuidValidation,
  userDuplicatedFieldsValidation,
} = require("./validations.service");

const { ValidationError } = require("../errors").ValidationError;
const { NotFoundError } = require("../errors").NotFoundError;

const User = require("../models/index").User;

const createUser = async (req, res, next) => {
  const errors = await userValidations(req.body);

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
  const errors = await userValidations(req.body);

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

const userValidations = async (user) => {
  const errors = [];

  validateCompletedField(emailValidation, user.email, "Email", errors);
  validateCompletedField(phoneValidation, user.phone, "Phone", errors);
  validateCompletedField(
    urlValidation,
    user.socialMediaLink,
    "Social media link",
    errors
  );
  validateCompletedField(passwordValidation, user.password, "Password", errors);
  validateCompletedField(nameValidation, user.firstName, "First name", errors);
  validateCompletedField(nameValidation, user.lastName, "Last name", errors);
  validateCompletedField(birthdayValidation, user.birthday, "Birthday", errors);
  validateCompletedField(
    uuidValidation,
    user.idDepartment,
    "Department id",
    errors
  );

  const existingUsers = await getAllUsers();

  if (existingUsers.length > 0) {
    if (
      validateCompletedField(uuidValidation, user.idMentor, "Mentor id", errors)
    ) {
      userDuplicatedFieldsValidation(existingUsers, user, errors);
    }
  } else {
    user.idMentor = null;
  }

  return errors;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
