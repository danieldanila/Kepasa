const User = require("../models/index").User;

const createUser = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const socialMediaLink = req.body.socialMediaLink;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  const isActive = req.body.isActive;
  const isAdministrator = req.body.isAdministrator;
  const idDepartment = req.body.idDepartment;
  const idMentor = req.body.idMentor;

  const errors = [];

  const emptyFieldError = "field is mandatoy!";
  if (!email) {
    errors.push(`Email ${emptyFieldError}`);
  }

  if (!phone) {
    errors.push(`Phone ${emptyFieldError}`);
  }

  if (!socialMediaLink) {
    errors.push(`Social media link ${emptyFieldError}`);
  }

  if (!password) {
    errors.push(`Password ${emptyFieldError}`);
  }

  if (!firstName) {
    errors.push(`First name ${emptyFieldError}`);
  }

  if (!lastName) {
    errors.push(`Last name ${emptyFieldError}`);
  }

  if (!birthday) {
    errors.push(`Birthday ${emptyFieldError}`);
  }

  if (!idDepartment) {
    errors.push(`Department ${emptyFieldError}`);
  }

  // if (!idMentor) {
  //   errors.push(`Mentor ${emptyFieldError}`);
  // }

  if (errors.length === 0) {
    await User.create({
      email: email,
      phone: phone,
      social_media_link: socialMediaLink,
      password: password,
      first_name: firstName,
      last_name: lastName,
      birthday: birthday,
      is_active: isActive,
      is_administrator: isAdministrator,
      id_department: idDepartment,
      id_mentor: idMentor,
    });
  } else {
    const errorMessage = `${errors.join(", ")}`;
    throw new Error(errorMessage);
  }
};

module.exports = {
  createUser,
};
