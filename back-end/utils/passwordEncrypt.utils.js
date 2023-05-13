const bcrypt = require("bcrypt");

const passwordEncrypt = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    console.err(err.message);
  }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  passwordEncrypt,
  comparePasswords,
};
