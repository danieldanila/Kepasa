const {
  validateCompletedField,
  nameValidation,
  duplicateFieldValidation,
  uuidValidation,
  foreignUuidValidation,
} = require("./general.validation");

const validation = {
  checkRoleFields: async (
    role,
    existingRoles,
    existingDepartments,
    isUpdateRequest
  ) => {
    const errors = [];
    validateCompletedField(
      nameValidation,
      role.name,
      "Name",
      errors,
      isUpdateRequest
    );

    validateCompletedField(
      foreignUuidValidation,
      role.idDepartment,
      "Department id",
      errors,
      isUpdateRequest,
      existingDepartments
    );

    if (role.id) {
      uuidValidation(role.id, "Role id", errors);
    }

    if (existingRoles.length > 0) {
      duplicateFieldValidation(
        role.name,
        "Role name",
        errors,
        existingRoles,
        "name"
      );

      if (role.id) {
        duplicateFieldValidation(
          role.id,
          "Role id",
          errors,
          existingRoles,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
