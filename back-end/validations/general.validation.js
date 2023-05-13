const {
  throwValidationErrorWithMessage,
} = require("../utils/errorsWrappers.util");

const validation = {
  mandatoryFieldValidation: (field, fieldName, errorsArray) => {
    if (!field) {
      errorsArray.push(`${fieldName} field is mandatory.`);
      return false;
    }
    return true;
  },

  validateCompletedField: (
    validationMethod,
    field,
    fieldName,
    errorsArray,
    isUpdateRequest,
    entityObjects
  ) => {
    if (isUpdateRequest && !field) {
      return true;
    } else if (
      validation.mandatoryFieldValidation(field, fieldName, errorsArray)
    ) {
      return validationMethod(field, fieldName, errorsArray, entityObjects);
    }
    return false;
  },

  nameValidation: (field, fieldName, errorsArray) => {
    if (field.length < 3) {
      errorsArray.push(
        `${fieldName} field must have a length greater than 3 characters!`
      );
      return false;
    }

    const onlyLettersAndSpacesAndHyphensRegex = /^[a-zA-Z]+(?:[- ][a-zA-Z]+)*$/;

    if (!field.match(onlyLettersAndSpacesAndHyphensRegex)) {
      errorsArray.push(
        `${fieldName} field must contain only letters, hyphens and spaces!`
      );
      return false;
    }

    return true;
  },

  emailValidation: (field, fieldName, errorsArray) => {
    if (
      !field.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorsArray.push(
        `${fieldName} field must use 'example@domain.net' format.`
      );
      return false;
    }
    return true;
  },

  phoneValidation: (field, fieldName, errorsArray) => {
    if (!field.match(/^\d+$/) || !(field.length === 10)) {
      errorsArray.push(`${fieldName} field must have a length of 10 digits.`);
      return false;
    }
    return true;
  },

  urlValidation: (field, fieldName, errorsArray) => {
    if (
      !field.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      )
    ) {
      errorsArray.push(`${fieldName} field must be an URL.`);
      return false;
    }
    return true;
  },

  passwordValidation: (field, fieldName, errorsArray) => {
    if (
      !field.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%^*?&])[A-Za-z\d@$#!%^*?&]{8,}$/
      )
    ) {
      errorsArray.push(
        `${fieldName} field must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.`
      );
      return false;
    }
    return true;
  },

  birthdayValidation: (field, fieldName, errorsArray) => {
    if (!field.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      errorsArray.push(`${fieldName} field must use yyyy-mm-dd fomrat.`);
      return false;
    }
    return true;
  },

  uuidValidation: (field, fieldName, errorsArray) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!field || !field.match(uuidRegex)) {
      errorsArray.push(`${fieldName} must be a valid uuid.`);
      return false;
    }
    return true;
  },

  foreignUuidValidation: (field, fieldName, errorsArray, entityObjects) => {
    validation.uuidValidation(field, fieldName, errorsArray);

    let doesUuidExists = false;
    entityObjects.forEach((entityObject) => {
      if (entityObject.id === field) {
        doesUuidExists = true;
      }
    });

    if (!doesUuidExists) {
      errorsArray.push(`${fieldName} doesn't exist.`);
    }
  },

  duplicateFieldValidation: (
    field,
    fieldName,
    errorsArray,
    entityObjects,
    propertyName
  ) => {
    entityObjects.forEach((entityObject) => {
      if (
        field &&
        entityObject[propertyName].toString().toLowerCase() ===
          field.toString().toLowerCase()
      ) {
        errorsArray.push(`${fieldName} already exists.`);
      }
    });
  },

  booleanFieldValidation: (field, fieldName, errorsArray) => {
    if (field && !(field === "true" || field === "false")) {
      errorsArray.push(`${fieldName} must be a boolean value.`);
    }
  },

  idParamaterValidation: (entityId, fieldName, errorsArray) => {
    if (!validation.uuidValidation(entityId, fieldName, errorsArray)) {
      throwValidationErrorWithMessage(errorsArray);
    }
    return entityId;
  },
};

module.exports = validation;
