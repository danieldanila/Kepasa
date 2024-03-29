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

  lengthGreaterThanThreeValidation: (field, fieldName, errorsArray) => {
    if (field.length < 3) {
      errorsArray.push(
        `${fieldName} field must have a length greater than 3 characters!`
      );
      return false;
    }
    return true;
  },

  onlyLettersAndSpacesAndHyphensValidation: (field, fieldName, errorsArray) => {
    const onlyLettersAndSpacesAndHyphensRegex = /^[a-zA-Z]+(?:[- ][a-zA-Z]+)*$/;

    if (!field.match(onlyLettersAndSpacesAndHyphensRegex)) {
      errorsArray.push(
        `${fieldName} field must contain only letters, hyphens and spaces!`
      );
      return false;
    }

    return true;
  },

  nameValidation: (field, fieldName, errorsArray) => {
    return (
      validation.lengthGreaterThanThreeValidation(
        field,
        fieldName,
        errorsArray
      ) &&
      validation.onlyLettersAndSpacesAndHyphensValidation(
        field,
        fieldName,
        errorsArray
      )
    );
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

  dateValidation: (field, fieldName, errorsArray) => {
    if (!field.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      errorsArray.push(`${fieldName} field must use yyyy-mm-dd fomrat.`);
      return false;
    }
    return true;
  },

  periodDatesValidation: (
    firstDate,
    firstFieldName,
    secondDate,
    secondFieldName,
    errorsArray
  ) => {
    if (firstDate > secondDate) {
      errorsArray.push(
        `${secondFieldName} must be greater than ${firstFieldName}.`
      );
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
      errorsArray.push(`${fieldName} with the value "${field}" doesn't exist.`);
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
        errorsArray.push(
          `${fieldName} with the value "${field}" already exists.`
        );
      }
    });
  },

  duplicateCompositeIdValidation: (
    firstId,
    firstIdName,
    secondId,
    secondIdName,
    errorsArray,
    entityObjects
  ) => {
    entityObjects.forEach((entityObject) => {
      if (
        firstId &&
        secondId &&
        entityObject[firstIdName].toString().toLowerCase() ===
          firstId.toString().toLowerCase() &&
        entityObject[secondIdName].toString().toLowerCase() ===
          secondId.toString().toLowerCase()
      ) {
        errorsArray.push(
          `The combination of ${firstIdName}: ${firstId} with ${secondIdName}: ${secondId} already exists.`
        );
      }
    });
  },

  booleanFieldValidation: (field, fieldName, errorsArray) => {
    if (
      field &&
      !(
        field === "true" ||
        field === "false" ||
        field === true ||
        field === false
      )
    ) {
      errorsArray.push(`${fieldName} must be a boolean value.`);
    }
  },

  idParamaterValidation: (entityId, fieldName, errorsArray) => {
    if (!validation.uuidValidation(entityId, fieldName, errorsArray)) {
      throwValidationErrorWithMessage(errorsArray);
    }
    return entityId;
  },

  moneyFieldValidation: (field, fieldName, errorsArray) => {
    if (!field.match(/^(\d+(\.\d{1,2})?)$/)) {
      errorsArray.push(
        `${fieldName} must be a number with a maximum of 2 decimals.`
      );
    }
  },

  minutesFieldValidation: (field, fieldName, errorsArray) => {
    if (!(field !== Infinity && field > 0 && field <= 1440)) {
      errorsArray.push(
        `${fieldName} must be an integer number between 1 and 1440 (where 1440 minutes = 24 hours).`
      );
    }
  },
};

module.exports = validation;
