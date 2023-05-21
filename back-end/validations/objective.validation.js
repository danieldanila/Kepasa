const {
  booleanFieldValidation,
  validateCompletedField,
  lengthGreaterThanThreeValidation,
  uuidValidation,
  foreignUuidValidation,
  duplicateFieldValidation,
} = require("./general.validation");

const validation = {
  checkObjectiveFields: async (
    objective,
    existingObjectives,
    existingUsers,
    existingPeriods,
    isUpdateRequest
  ) => {
    const errors = [];

    validateCompletedField(
      lengthGreaterThanThreeValidation,
      objective.name,
      "Name",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      lengthGreaterThanThreeValidation,
      objective.description,
      "Description",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      lengthGreaterThanThreeValidation,
      objective.details,
      "Details",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      lengthGreaterThanThreeValidation,
      objective.feedback,
      "Name",
      errors,
      true
    );
    validateCompletedField(
      foreignUuidValidation,
      objective.idUser,
      "User id",
      errors,
      isUpdateRequest,
      existingUsers
    );
    validateCompletedField(
      foreignUuidValidation,
      objective.idPeriod,
      "Period id",
      errors,
      isUpdateRequest,
      existingPeriods
    );
    booleanFieldValidation(objective.isFinished, "Is Finished", errors);

    if (objective.id) {
      uuidValidation(objective.id, "objective id", errors);
    }

    if (existingObjectives.length > 0) {
      if (objective.id) {
        duplicateFieldValidation(
          objective.id,
          "Objective id",
          errors,
          existingObjectives,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
