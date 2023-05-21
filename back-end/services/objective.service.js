const { NotFoundError } = require("../errors").NotFoundError;
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const objectiveValidations = require("../validations").ObjectiveValidation;

const Objective = require("../models").Objective;

const getAllUsers = require("./user.service").getAllUsers;
const getAllPeriods = require("./period.service").getAllPeriods;

const service = {
  createObjective: async (objectiveBody) => {
    const existingObjectives = await service.getAllObjectives();
    const existingUsers = await getAllUsers();
    const existingPeriods = await getAllPeriods();
    const errors = await objectiveValidations.checkObjectiveFields(
      objectiveBody,
      existingObjectives,
      existingUsers,
      existingPeriods,
      false
    );

    if (errors.length === 0) {
      await Objective.create(objectiveBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultipleObjectives: async (arrayOfObjectivesBodies) => {
    for (const objectiveBody of arrayOfObjectivesBodies) {
      await service.createObjective(objectiveBody);
    }
  },

  getAllObjectives: async () => {
    const objectives = await Objective.findAll();
    return objectives;
  },

  getObjectiveById: async (objectiveId) => {
    const errors = [];

    idParamaterValidation(objectiveId, "Objective id", errors);

    const objective = await Objective.findByPk(objectiveId);

    if (objective) {
      return objective;
    } else {
      throw new NotFoundError("Objective not found.");
    }
  },

  updateObjective: async (objectiveId, objectiveBody) => {
    const existingObjectives = await service.getAllObjectives();
    const existingUsers = await getAllUsers;
    const existingPeriods = await getAllPeriods;
    const errors = await objectiveValidations.checkObjectiveFields(
      objectiveBody,
      existingObjectives,
      existingUsers,
      existingPeriods,
      true
    );

    if (errors.length === 0) {
      const objectiveFound = await service.getObjectiveById(objectiveId);

      const updatedObjective = await objectiveFound.update(objectiveBody);
      return updatedObjective;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deleteObjective: async (objectiveId) => {
    const objective = await service.getObjectiveById(objectiveId);

    objective.destroy();
  },
};

module.exports = service;
