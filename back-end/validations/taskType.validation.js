const {
  validateCompletedField,
  nameValidation,
  duplicateFieldValidation,
  uuidValidation,
} = require("./general.validation");

const validation = {
  checkTaskTypeFields: async (taskType, existingTaskTypes, isUpdateRequest) => {
    const errors = [];

    validateCompletedField(
      nameValidation,
      taskType.name,
      "Name",
      errors,
      isUpdateRequest
    );

    if (taskType.id) {
      uuidValidation(taskType.id, "Task Type id", errors);
    }

    if (existingTaskTypes.length > 0) {
      duplicateFieldValidation(
        taskType.name,
        "Task Type name",
        errors,
        existingTaskTypes,
        "name"
      );

      if (taskType.id) {
        duplicateFieldValidation(
          taskType.id,
          "Task Type id",
          errors,
          existingTaskTypes,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
