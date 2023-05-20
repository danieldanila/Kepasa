const { idParamaterValidation } = require("../validations/general.validation");
const userValidations = require("../validations").UserValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { NotFoundError } = require("../errors").NotFoundError;

const { passwordEncrypt } = require("../utils/passwordEncrypt.utils");

const User = require("../models").User;
const Department = require("../models").Department;

const getAllDepartments = require("./department.service").getAllDepartments;

const service = {
  createUser: async (userBody) => {
    const existingUsers = await service.getAllUsers();
    const existingDepartments = await getAllDepartments();
    const errors = await userValidations.checkUserFields(
      userBody,
      existingUsers,
      existingDepartments,
      false
    );

    if (errors.length === 0) {
      const hashPassword = await passwordEncrypt(userBody.password);
      userBody.password = hashPassword;
      await User.create(userBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleUsers: async (arrayOfUserBodies) => {
    for (const userBody of arrayOfUserBodies) {
      await service.createUser(userBody);
    }
  },

  getAllUsers: async () => {
    const users = await User.findAll();
    return users;
  },

  getUserById: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findByPk(userId);

    if (user) {
      return user;
    } else {
      throw new NotFoundError("User not found.");
    }
  },

  updateUser: async (userId, userBody) => {
    const existingUsers = await service.getAllUsers();
    const existingDepartments = await getAllDepartments();
    const errors = await userValidations.checkUserFields(
      userBody,
      existingUsers,
      existingDepartments,
      true
    );

    if (errors.length === 0) {
      const userFound = await service.getUserById(userId);

      if (userBody.hasOwnProperty("password")) {
        const hashPassword = await passwordEncrypt(userBody.password);
        userBody.password = hashPassword;
      }

      const updatedUser = await userFound.update(userBody);
      return updatedUser;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteUser: async (userId) => {
    const user = await service.getUserById(userId);

    user.destroy();
  },

  getUserMentor: async (userId) => {
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
  },

  getUserMentees: async (userId) => {
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
  },

  getUserDepartment: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const userDepartment = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Department,
        },
      ],
    });

    if (userDepartment) {
      return userDepartment.Department;
    } else {
      throw new NotFoundError("User not found.");
    }
  },
};

module.exports = service;
