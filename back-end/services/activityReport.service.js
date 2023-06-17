const { NotFoundError } = require("../errors");
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const activityReportValidation =
  require("../validations").ActivityReportValidation;

const ActivityReport = require("../models").ActivityReport;
const User = require("../models").User;
const Period = require("../models").Period;
const Project = require("../models").Project;
const TaskType = require("../models").TaskType;

const getAllUsers = require("./user.service").getAllUsers;
const getAllPeriods = require("./period.service").getAllPeriods;
const getAllProjects = require("./project.service").getAllProjects;
const getAllTaskTypes = require("./taskType.service").getAllTaskTypes;

const usersProjectsRolesService = require("./usersProjectsRoles.service");
const roleService = require("./role.service");

const service = {
  createActivityReport: async (activityReportBody) => {
    const existingActivityReports = await service.getAllActivityReports();
    const existingUsers = await getAllUsers();
    const existingPeriods = await getAllPeriods();
    const existingProjects = await getAllProjects();
    const existingTaskTypes = await getAllTaskTypes();
    const errors = await activityReportValidation.checkActivityReportFields(
      activityReportBody,
      existingActivityReports,
      existingUsers,
      existingPeriods,
      existingProjects,
      existingTaskTypes,
      false
    );

    if (errors.length === 0) {
      const userRoleOnProject =
        await usersProjectsRolesService.getUserRoleOnProject(
          activityReportBody.idUser,
          activityReportBody.idProject
        );

      const superiorRole = await roleService.getRoleSuperiorRole(
        userRoleOnProject.id
      );

      if (superiorRole) {
        const superiorUser =
          await usersProjectsRolesService.getUserWithRoleOnProject(
            superiorRole.id,
            activityReportBody.idProject
          );
        activityReportBody.idApprover = superiorUser ? superiorUser.id : null;
      }

      await ActivityReport.create(activityReportBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleActivityReports: async (arrayOfActivityReportsBodies) => {
    for (const activityReportBody of arrayOfActivityReportsBodies) {
      await service.createActivityReport(activityReportBody);
    }
  },

  getAllActivityReports: async () => {
    const activityReport = await ActivityReport.findAll({
      include: [
        {
          model: User,
          as: "User",
        },
        {
          model: User,
          as: "Approver",
        },
        {
          model: Period,
        },
        {
          model: Project,
        },
        {
          model: TaskType,
        },
      ],
    });
    return activityReport;
  },

  getActivityReportById: async (activityReportId) => {
    const errors = [];

    idParamaterValidation(activityReportId, "Activity Report id", errors);

    const activityReport = await ActivityReport.findByPk(activityReportId, {
      include: [
        {
          model: User,
          as: "User",
        },
        {
          model: User,
          as: "Approver",
        },
        {
          model: Period,
        },
        {
          model: Project,
        },
        {
          model: TaskType,
        },
      ],
    });

    if (activityReport) {
      return activityReport;
    } else {
      throw new NotFoundError("Activity Report not found.");
    }
  },

  updateActivityReport: async (activityReportId, activityReportBody) => {
    const existingActivityReports = await service.getAllActivityReports();
    const existingUsers = await getAllUsers();
    const existingPeriods = await getAllPeriods();
    const existingProjects = await getAllProjects();
    const existingTaskTypes = await getAllTaskTypes();
    const errors = await activityReportValidation.checkActivityReportFields(
      activityReportBody,
      existingActivityReports,
      existingUsers,
      existingPeriods,
      existingProjects,
      existingTaskTypes,
      true
    );

    if (errors.length === 0) {
      const activityReportFound = await service.getActivityReportById(
        activityReportId
      );

      const updatedActivityReport = await activityReportFound.update(
        activityReportBody
      );
      return updatedActivityReport;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteActivityReport: async (activityReportId) => {
    const activityReport = await service.getActivityReportById(
      activityReportId
    );

    activityReport.destroy();
  },

  getActivityReportUser: async (activityReportId) => {
    const errors = [];

    idParamaterValidation(activityReportId, "Activity Report id", errors);

    const activityReport = await ActivityReport.findOne({
      where: {
        id: activityReportId,
      },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });

    if (activityReport) {
      return activityReport.User;
    } else {
      throw new NotFoundError("Activity Report not found.");
    }
  },

  getActivityReportPeriod: async (activityReportId) => {
    const errors = [];

    idParamaterValidation(activityReportId, "Activity Report id", errors);

    const activityReport = await ActivityReport.findOne({
      where: {
        id: activityReportId,
      },
      include: [
        {
          model: Period,
        },
      ],
    });

    if (activityReport) {
      return activityReport.Period;
    } else {
      throw new NotFoundError("Activity Report not found.");
    }
  },

  getActivityReportProject: async (activityReportId) => {
    const errors = [];

    idParamaterValidation(activityReportId, "Activity Report id", errors);

    const activityReport = await ActivityReport.findOne({
      where: {
        id: activityReportId,
      },
      include: [
        {
          model: Project,
        },
      ],
    });

    if (activityReport) {
      return activityReport.Project;
    } else {
      throw new NotFoundError("Activity Report not found.");
    }
  },

  getActivityReportTaskType: async (activityReportId) => {
    const errors = [];

    idParamaterValidation(activityReportId, "Activity Report id", errors);

    const activityReport = await ActivityReport.findOne({
      where: {
        id: activityReportId,
      },
      include: [
        {
          model: TaskType,
        },
      ],
    });

    if (activityReport) {
      return activityReport.TaskType;
    } else {
      throw new NotFoundError("Activity Report not found.");
    }
  },
};

module.exports = service;
