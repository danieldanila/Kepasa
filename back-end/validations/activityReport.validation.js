const {
  booleanFieldValidation,
  validateCompletedField,
  lengthGreaterThanThreeValidation,
  uuidValidation,
  foreignUuidValidation,
  duplicateFieldValidation,
  minutesFieldValidation,
} = require("./general.validation");

const validation = {
  checkActivityReportFields: async (
    activityReport,
    existingActivityReports,
    existingUsers,
    existingPeriods,
    existingProjects,
    existingTaskTypes,
    isUpdateRequest
  ) => {
    const errors = [];

    validateCompletedField(
      lengthGreaterThanThreeValidation,
      activityReport.description,
      "Description",
      errors,
      isUpdateRequest
    );

    validateCompletedField(
      minutesFieldValidation,
      activityReport.investedTime,
      "Invested Time",
      errors,
      isUpdateRequest
    );

    booleanFieldValidation(activityReport.isApproved, "Is Approved", errors);

    validateCompletedField(
      lengthGreaterThanThreeValidation,
      activityReport.rejectJustification,
      "Reject Justification",
      errors,
      true
    );

    validateCompletedField(
      foreignUuidValidation,
      activityReport.idUser,
      "User id",
      errors,
      isUpdateRequest,
      existingUsers
    );
    validateCompletedField(
      foreignUuidValidation,
      activityReport.idPeriod,
      "Period id",
      errors,
      isUpdateRequest,
      existingPeriods
    );
    validateCompletedField(
      foreignUuidValidation,
      activityReport.idProject,
      "Project id",
      errors,
      isUpdateRequest,
      existingProjects
    );
    validateCompletedField(
      foreignUuidValidation,
      activityReport.idTaskType,
      "Task Type id",
      errors,
      isUpdateRequest,
      existingTaskTypes
    );

    if (activityReport.id) {
      uuidValidation(activityReport.id, "objective id", errors);
    }

    if (existingActivityReports.length > 0) {
      if (activityReport.id) {
        duplicateFieldValidation(
          activityReport.id,
          "Objective id",
          errors,
          existingActivityReports,
          "id"
        );
      }
    }

    return errors;
  },
};

module.exports = validation;
