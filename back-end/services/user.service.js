const { idParamaterValidation } = require("../validations/general.validation");
const userValidations = require("../validations").UserValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { NotFoundError } = require("../errors");

const User = require("../models").User;
const Department = require("../models").Department;
const Objective = require("../models").Objective;
const ActivityReport = require("../models").ActivityReport;
const UsersProjectsRoles = require("../models").UsersProjectsRoles;
const Role = require("../models").Role;

const getAllDepartments = require("./department.service").getAllDepartments;

const { Op } = require("sequelize");
const AppError = require("../utils/appError");
const { Period } = require("../models");

const filterObject = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach((element) => {
    if (allowedFields.includes(element)) {
      newObject[element] = object[element];
    }
  });
  return newObject;
};

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
      const newUser = await User.create(userBody);

      return newUser;
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
    const users = await User.scope("withPassword").findAll();
    return users;
  },

  getAllUsersWithDepartmentAndMentorNames: async () => {
    const users = await User.findAll({
      include: [
        {
          model: User,
          as: "mentor",
        },
        {
          model: Department,
        },
      ],
    });
    return users;
  },

  getUserById: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.scope("withPassword").findByPk(userId);

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

      const updatedUser = await userFound.update(userBody);
      return updatedUser;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  updateMe: async (loggedUser, userBody) => {
    if (userBody.password) {
      throw new AppError(
        "You can't updated your password here. Please use the update password method.",
        400
      );
    }

    const filteredBody = filterObject(
      userBody,
      "email",
      "phone",
      "socialMediaLink",
      "firstName",
      "lastName",
      "birthday"
    );
    const updatedUser = await service.updateUser(loggedUser.id, filteredBody);

    return updatedUser;
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

  getUserObjectives: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const userObjectives = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Objective,
          include: [
            {
              model: Period,
            },
          ],
        },
      ],
    });

    if (userObjectives) {
      return userObjectives.Objectives;
    } else {
      throw new NotFoundError("User not found");
    }
  },

  getUserObjectiveById: async (userId, objectiveId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const userObjective = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Objective,
          where: {
            id: objectiveId,
          },
        },
      ],
    });

    if (userObjective) {
      return userObjective.Objectives[0];
    } else {
      throw new NotFoundError("User with the the specific objective not found");
    }
  },

  getUserMenteesObjectives: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: User,
          as: "mentees",
          include: [
            {
              model: Objective,
            },
          ],
        },
      ],
    });

    if (user) {
      const userMentees = user.mentees;
      const userMenteesObjectives = userMentees.map(
        (userMentee) => userMentee.Objectives
      );
      return userMenteesObjectives;
    } else {
      throw new NotFoundError("User not found");
    }
  },

  getUserMenteeObjectives: async (userId, menteeId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: User,
          as: "mentees",
          where: {
            id: menteeId,
          },
          include: [
            {
              model: Objective,
            },
          ],
        },
      ],
    });

    if (user) {
      const userMentee = user.mentees;
      const userMenteeObjectives = userMentee.map(
        (userMentee) => userMentee.Objectives
      );
      return userMenteeObjectives[0];
    } else {
      throw new NotFoundError("User with the specified mentee not found");
    }
  },

  getUserMenteeObjectiveById: async (userId, menteeId, objectiveId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: User,
          as: "mentees",
          where: {
            id: menteeId,
          },
          include: [
            {
              model: Objective,
              where: {
                id: objectiveId,
              },
            },
          ],
        },
      ],
    });

    if (user) {
      const userMentee = user.mentees;
      const userMenteeObjective = userMentee.map(
        (userMentee) => userMentee.Objectives
      );
      return userMenteeObjective[0][0];
    } else {
      throw new NotFoundError(
        "User with the specified mentee with the specified objective not found"
      );
    }
  },

  getUserActivityReports: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: ActivityReport,
        },
      ],
    });

    if (user) {
      return user.ActivityReports;
    } else {
      throw new NotFoundError("User not found");
    }
  },

  getUserActivityReportById: async (userId, activityReportId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: ActivityReport,
          where: {
            id: activityReportId,
          },
        },
      ],
    });

    if (user) {
      return user.ActivityReports[0];
    } else {
      throw new NotFoundError(
        "User with the the specific activity report not found"
      );
    }
  },

  getUserSubUsersActivityReports: async (userId) => {
    const errors = [];

    idParamaterValidation(userId, "User id", errors);

    const usersProjectsRoles = await UsersProjectsRoles.findAll({
      where: {
        idUser: userId,
      },
    });

    const usersSubUsersActivityReports = [];

    for (const userProjectRole of usersProjectsRoles) {
      const role = await Role.findOne({
        where: {
          id: userProjectRole.idRole,
        },
        include: {
          model: Role,
          as: "subRoles",
        },
      });

      for (const subRole of role.subRoles) {
        const subUsersProjectsRoles = await UsersProjectsRoles.findAll({
          where: {
            idRole: subRole.id,
            ...(userProjectRole.idProject !== process.env.ALL_PROJECTS_ID && {
              idProject: { [Op.eq]: userProjectRole.idProject },
            }),
          },
        });

        for (const subUserProjectRole of subUsersProjectsRoles) {
          const subUsersActivityReports = await ActivityReport.findAll({
            where: {
              idUser: subUserProjectRole.idUser,
              idProject: subUserProjectRole.idProject,
            },
          });

          if (subUsersActivityReports.length > 0) {
            usersSubUsersActivityReports.push(subUsersActivityReports);
          }
        }
      }
    }

    if (usersSubUsersActivityReports) {
      return usersSubUsersActivityReports;
    } else {
      throw new NotFoundError("User has no sub users with activity reports.");
    }
  },
};

module.exports = service;
