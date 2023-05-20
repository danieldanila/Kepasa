const {
  validateCompletedField,
  nameValidation,
  duplicateFieldValidation,
  uuidValidation,
  dateValidation,
  periodDatesValidation,
} = require("./general.validation");

const validation = {
  checkPeriodFields: async (period, existingPeriods, isUpdateRequest) => {
    const errors = [];

    validateCompletedField(
      nameValidation,
      period.name,
      "Name",
      errors,
      isUpdateRequest
    );

    validateCompletedField(
      dateValidation,
      period.startDate,
      "Start Date",
      errors,
      isUpdateRequest
    );

    validateCompletedField(
      dateValidation,
      period.endDate,
      "End Date",
      errors,
      isUpdateRequest
    );

    periodDatesValidation(
      period.startDate,
      "Start Date",
      period.endDate,
      "End Date",
      errors
    );

    if (existingPeriods.length > 0) {
      duplicateFieldValidation(
        period.name,
        "Period name",
        errors,
        existingPeriods,
        "name"
      );
    }

    if (period.id) {
      uuidValidation(period.id, "Period id", errors);
    }

    return errors;
  },
};

module.exports = validation;
