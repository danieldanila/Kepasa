const {
  validateCompletedField,
  nameValidation,
  duplicateFieldValidation,
  uuidValidation,
} = require("./general.validation");

const validation = {
  checkProjectFieds: async (project, existingProjects, isUpdateRequest) => {
    const errors = [];
    validateCompletedField(
      nameValidation,
      project.name,
      "Name",
      errors,
      isUpdateRequest
    );

    if (project.id) {
      uuidValidation(project.id, "Project id", errors);
    }

    if (existingProjects.length > 0) {
      duplicateFieldValidation(
        project.name,
        "Project name",
        errors,
        existingProjects,
        "name"
      );

      if (project.id) {
        duplicateFieldValidation(
          project.id,
          "Period id",
          errors,
          existingProjects,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
