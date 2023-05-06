const mandatoryFieldValidation = (field, fieldName, errorsArray) => {
  if (!field) {
    errorsArray.push(`${fieldName} field is mandatory.`);
    return false;
  }
  return true;
};

const validateCompletedField = (
  validationMethod,
  field,
  fieldName,
  errorsArray
) => {
  if (mandatoryFieldValidation(field, fieldName, errorsArray)) {
    return validationMethod(field, fieldName, errorsArray);
  }
  return false;
};

const nameValidation = (field, fieldName, errorsArray) => {
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
};

const emailValidation = (field, fieldName, errorsArray) => {
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
};

const phoneValidation = (field, fieldName, errorsArray) => {
  if (!field.match(/^\d+$/) || !(field.length === 10)) {
    errorsArray.push(`${fieldName} field must have a length of 10 digits.`);
    return false;
  }
  return true;
};

const urlValidation = (field, fieldName, errorsArray) => {
  if (
    !field.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
  ) {
    errorsArray.push(`${fieldName} field must be an URL.`);
    return false;
  }
  return true;
};

const passwordValidation = (field, fieldName, errorsArray) => {
  if (
    !field.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
    )
  ) {
    errorsArray.push(
      `${fieldName} field must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:`
    );
    return false;
  }
  return true;
};

const birthdayValidation = (field, fieldName, errorsArray) => {
  if (!field.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)) {
    errorsArray.push(`${fieldName} field must use yyyy-mm-dd fomrat.`);
    return false;
  }
  return true;
};

const uuidValidation = (field, fieldName, errorsArray) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!field.match(uuidRegex)) {
    errorsArray.push(`${fieldName} must be a valid uuid.`);
    return false;
  }
  return true;
};

const userDuplicatedFieldsValidation = (
  existingUsers,
  newUser,
  errorsArray
) => {
  let doesMentorExists = false;

  existingUsers.forEach((existingUser) => {
    if (existingUser.email === newUser.email) {
      errorsArray.push("The email already exists.");
    }

    if (existingUser.phone === newUser.phone) {
      errorsArray.push("The phone already exists.");
    }

    if (existingUser.socialMediaLink === newUser.socialMediaLink) {
      errorsArray.push("The social media link already exists.");
    }

    if (existingUser.id === newUser.idMentor) {
      doesMentorExists = true;
    }
  });

  if (!doesMentorExists) {
    errorsArray.push("The mentor id doesn't exists.");
  }
};

module.exports = {
  mandatoryFieldValidation,
  validateCompletedField,
  nameValidation,
  emailValidation,
  phoneValidation,
  urlValidation,
  passwordValidation,
  birthdayValidation,
  uuidValidation,
  userDuplicatedFieldsValidation,
};
