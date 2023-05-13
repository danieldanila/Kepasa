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

    if (existingDepartments.length > 0) {
      duplicateFieldValidation(
        department.name,
        "Department name",
        errors,
        existingDepartments,
        "name"
      );
    }

    if (department.id) {
      uuidValidation(department.id, "Department id", errors);
    }

    return errors;
  },
};

module.exports = validation;
