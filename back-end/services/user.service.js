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
  uuidValidation,
  idParamaterValidation,
} = require("../utils/validations.util");
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const { NotFoundError } = require("../errors").NotFoundError;

const User = require("../models/index").User;
const departmentService = require("./index").departmentService;

const createUser = async (userBody) => {
  const errors = await userValidations(userBody, false);

  if (errors.length === 0) {
    await User.create(userBody);
  } else {
    throwValidationErrorWithMessage(errors);
  }
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  const errors = [];

  idParamaterValidation(userId, "User id", errors);

  const user = await User.findByPk(userId);

  if (user) {
    return user;
  } else {
    throw new NotFoundError("User not found.");
  }
};

const updateUser = async (userId, userBody) => {
  const errors = await userValidations(userBody, true);

  if (errors.length === 0) {
    idParamaterValidation(userId, "User id", errors);
    const userFound = await User.findByPk(userId);

    if (userFound) {
      const updatedUser = await userFound.update(userBody);
      return updatedUser;
    } else {
      throw new NotFoundError("User not found.");
    }
  } else {
    throwValidationErrorWithMessage(errors);
  }
};

const deleteUser = async (userId) => {
  const errors = [];

  idParamaterValidation(userId, "User id", errors);
  const user = await User.findByPk(userId);

  if (user) {
    user.destroy();
  } else {
    throw new NotFoundError("User not found.");
  }
};

const getUserMentor = async (userId) => {
  const errors = [];

  idParamaterValidation(userId, "User id", errors);

  const userMentor = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: User,
        as: "mentor",
      },
    ],
  });

  if (userMentor) {
    return userMentor.mentor;
  } else {
    throw new NotFoundError("User not found.");
  }
};

const getUserMentees = async (userId) => {
  const errors = [];

  idParamaterValidation(userId, "User id", errors);

  const userMentees = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: User,
        as: "mentees",
      },
    ],
  });

  if (userMentees) {
    return userMentees.mentees;
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

    if (user.id) {
      duplicateFieldValidation(user.id, "User id", errors, existingUsers, "id");
    }
  } else {
    user.idMentor = null;
  }

  booleanFieldValidation(user.isActive, "Is Active", errors);
  booleanFieldValidation(user.isAdministrator, "Is Administrator", errors);

  if (user.id) {
    uuidValidation(user.id, "User id", errors);
  }

  return errors;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserMentor,
  getUserMentees,
};
