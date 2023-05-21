const {
  validateCompletedField,
  duplicateFieldValidation,
  uuidValidation,
  nameValidation,
} = require("./general.validation");

const validation = {
  checkDepartmentFields: async (
    department,
    existingDepartments,
    isUpdateRequest
  ) => {
    const errors = [];
    validateCompletedField(
      nameValidation,
      department.name,
      "Name",
      errors,
      isUpdateRequest
    );

    if (department.id) {
      uuidValidation(department.id, "Department id", errors);
    }

    if (existingDepartments.length > 0) {
      duplicateFieldValidation(
        department.name,
        "Department name",
        errors,
        existingDepartments,
        "name"
      );

      if (department.id) {
        duplicateFieldValidation(
          department.id,
          "Department id",
          errors,
          existingDepartments,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
