const {
  validateCompletedField,
  foreignUuidValidation,
  duplicateCompositeIdValidation,
  moneyFieldValidation,
} = require("./general.validation");

const validation = {
  checkRolesProjectsFields: async (
    rolesProjects,
    existingRolesProjects,
    existingRoles,
    existingProjects,
    isUpdateRequest
  ) => {
    const errors = [];

    validateCompletedField(
      foreignUuidValidation,
      rolesProjects.idRole,
      "Role id",
      errors,
      isUpdateRequest,
      existingRoles
    );

    validateCompletedField(
      foreignUuidValidation,
      rolesProjects.idProject,
      "Project id",
      errors,
      isUpdateRequest,
      existingProjects
    );

    validateCompletedField(
      moneyFieldValidation,
      rolesProjects.hourlyPay,
      "Hourly Pay",
      errors,
      isUpdateRequest
    );

    if (existingRolesProjects.length > 0) {
      duplicateCompositeIdValidation(
        rolesProjects.idRole,
        "idRole",
        rolesProjects.idProject,
        "idProject",
        errors,
        existingRolesProjects
      );
    }

    return errors;
  },
};

module.exports = validation;
