const { idParamaterValidation } = require("../validations/general.validation");
const taskTypeValidations = require("../validations").TaskTypeValidation;

const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { NotFoundError } = require("../errors");

const TaskType = require("../models").TaskType;
const ActivityReport = require("../models").ActivityReport;

const service = {
  createTaskType: async (taskTypeBody) => {
    const existingTaskTypes = await service.getAllTaskTypes();
    const errors = await taskTypeValidations.checkTaskTypeFields(
      taskTypeBody,
      existingTaskTypes,
      false
    );

    if (errors.length === 0) {
      await TaskType.create(taskTypeBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleTaskTypes: async (arrayOfTaskTypesBodies) => {
    for (const taskTypeBody of arrayOfTaskTypesBodies) {
      await service.createTaskType(taskTypeBody);
    }
  },

  getAllTaskTypes: async () => {
    const taskTypes = await TaskType.findAll();
    return taskTypes;
  },

  getTaskTypeById: async (taskTypeId) => {
    const errors = [];

    idParamaterValidation(taskTypeId, "Task Type id", errors);

    const taskType = await TaskType.findByPk(taskTypeId);

    if (taskType) {
      return taskType;
    } else {
      throw new NotFoundError("Task Type not found.");
    }
  },

  updateTaskType: async (taskTypeId, taskTypeBody) => {
    const existingTaskTypes = await service.getAllTaskTypes();
    const errors = await taskTypeValidations.checkTaskTypeFields(
      taskTypeBody,
      existingTaskTypes,
      true
    );

    if (errors.length === 0) {
      const taskTypeFound = await service.getTaskTypeById(taskTypeId);
      const updatedTaskType = await taskTypeFound.update(taskTypeBody);
      return updatedTaskType;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteTaskType: async (taskTypeId) => {
    const taskType = await service.getTaskTypeById(taskTypeId);

    taskType.destroy();
  },

  getTaskTypeActivityReports: async (taskTypeId) => {
    const errors = [];

    idParamaterValidation(taskTypeId, "Task Type id", errors);

    const taskType = await TaskType.findOne({
      where: {
        id: taskTypeId,
      },
      include: [
        {
          model: ActivityReport,
        },
      ],
    });

    if (taskType) {
      return taskType.ActivityReports;
    } else {
      throw new NotFoundError("Task Type not found");
    }
  },

  getTaskTypeActivityReportById: async (taskTypeId, activityReportId) => {
    const errors = [];

    idParamaterValidation(taskTypeId, "Task Type id", errors);

    const taskType = await TaskType.findOne({
      where: {
        id: taskTypeId,
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

    if (taskType) {
      return taskType.ActivityReports[0];
    } else {
      throw new NotFoundError(
        "Task Type with the the specific activity report not found"
      );
    }
  },
};

module.exports = service;
