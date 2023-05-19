const {
  validateCompletedField,
  foreignUuidValidation,
  duplicateCompositeIdValidation,
} = require("./general.validation");

const validation = {
  checkUsersProjectsRolesFields: async (
    usersProjectsRoles,
    existingUsersProjectsRoles,
    existingUsers,
    existingProjects,
    existingRoles,
    isUpdateRequest
  ) => {
    const errors = [];

    validateCompletedField(
      foreignUuidValidation,
      usersProjectsRoles.idUser,
      "User id",
      errors,
      isUpdateRequest,
      existingUsers
    );

    validateCompletedField(
      foreignUuidValidation,
      usersProjectsRoles.idProject,
      "Project id",
      errors,
      isUpdateRequest,
      existingProjects
    );

    validateCompletedField(
      foreignUuidValidation,
      usersProjectsRoles.idRole,
      "Role id",
      errors,
      isUpdateRequest,
      existingRoles
    );

    if (existingUsersProjectsRoles.length > 0) {
      duplicateCompositeIdValidation(
        usersProjectsRoles.idUser,
        "idUser",
        usersProjectsRoles.idProject,
        "idProject",
        errors,
        existingUsersProjectsRoles
      );
    }

    return errors;
  },
};

module.exports = validation;
