const { Sequelize } = require("sequelize");

const Database = require("../config/database");
const UserModel = require("./user");

const User = UserModel(Database, Sequelize);

module.exports = {
  User,
  connection: Database,
};
