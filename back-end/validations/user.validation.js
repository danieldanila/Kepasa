const {
  validateCompletedField,
  nameValidation,
  emailValidation,
  phoneValidation,
  urlValidation,
  passwordValidation,
  dateValidation,
  foreignUuidValidation,
  duplicateFieldValidation,
  booleanFieldValidation,
  uuidValidation,
} = require("./general.validation");

const validation = {
  checkUserFields: async (
    user,
    existingUsers,
    existingDepartments,
    isUpdateRequest
  ) => {
    const errors = [];

    validateCompletedField(
      emailValidation,
      user.email,
      "Email",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      phoneValidation,
      user.phone,
      "Phone",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      urlValidation,
      user.socialMediaLink,
      "Social media link",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      passwordValidation,
      user.password,
      "Password",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      nameValidation,
      user.firstName,
      "First name",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      nameValidation,
      user.lastName,
      "Last name",
      errors,
      isUpdateRequest
    );
    validateCompletedField(
      dateValidation,
      user.birthday,
      "Birthday",
      errors,
      isUpdateRequest
    );

    validateCompletedField(
      foreignUuidValidation,
      user.idDepartment,
      "Department id",
      errors,
      isUpdateRequest,
      existingDepartments
    );

    booleanFieldValidation(user.isActive, "Is Active", errors);
    booleanFieldValidation(user.isAdministrator, "Is Administrator", errors);

    if (user.id) {
      uuidValidation(user.id, "User id", errors);
    }

    if (existingUsers.length > 0) {
      validateCompletedField(
        foreignUuidValidation,
        user.idMentor,
        "Mentor id",
        errors,
        isUpdateRequest,
        existingUsers
      );

      duplicateFieldValidation(
        user.email,
        "Email",
        errors,
        existingUsers,
        "email"
      );

      duplicateFieldValidation(
        user.phone,
        "Phone",
        errors,
        existingUsers,
        "phone"
      );

      duplicateFieldValidation(
        user.socialMediaLink,
        "Social media link",
        errors,
        existingUsers,
        "socialMediaLink"
      );

      if (user.id) {
        duplicateFieldValidation(
          user.id,
          "User id",
          errors,
          existingUsers,
          "id"
        );
      }
    } else {
      user.idMentor = null;
    }

    return errors;
  },
};

module.exports = validation;
