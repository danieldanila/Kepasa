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

    if (existingProjects.length > 0) {
      duplicateFieldValidation(
        project.name,
        "Project name",
        errors,
        existingProjects,
        "name"
      );
    }

    if (project.id) {
      uuidValidation(project.id, "Project id", errors);
    }

    return errors;
  },
};

module.exports = validation;
