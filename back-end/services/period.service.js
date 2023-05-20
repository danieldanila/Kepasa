const { NotFoundError } = require("../errors").NotFoundError;
const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");
const { idParamaterValidation } = require("../validations/general.validation");

const periodValidation = require("../validations").PeriodValidation;

const Period = require("../models").Period;

const service = {
  createPeriod: async (periodBody) => {
    const existingPeriods = await service.getAllPeriods();
    const errors = await periodValidation.checkPeriodFields(
      periodBody,
      existingPeriods,
      false
    );

    if (errors.length === 0) {
      await Period.create(periodBody);
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  createMultiplePeriods: async (arrayOfPeriodsBodies) => {
    for (const periodBody of arrayOfPeriodsBodies) {
      await service.createPeriod(periodBody);
    }
  },

  getAllPeriods: async () => {
    const periods = await Period.findAll();
    return periods;
  },

  getPeriodById: async (periodId) => {
    const errors = [];

    idParamaterValidation(periodId, "Period id", errors);

    const period = await Period.findByPk(periodId);

    if (period) {
      return period;
    } else {
      throw new NotFoundError("Period not found.");
    }
  },

  updatePeriod: async (periodId, periodBody) => {
    const existingPeriods = await service.getAllPeriods();
    const errors = await periodValidation.checkPeriodFields(
      periodBody,
      existingPeriods,
      true
    );

    if (errors.length === 0) {
      const periodFound = await service.getPeriodById(periodId);
      const updatedPeriod = await periodFound.update(periodBody);
      return updatedPeriod;
    } else {
      throwValidationErrorWithMessage(errors);
    }
  },

  deletePeriod: async (periodId) => {
    const period = await service.getPeriodById(periodId);

    period.destroy();
  },
};

module.exports = service;
