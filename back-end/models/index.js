const { Sequelize } = require("sequelize");

const Database = require("../configs/database.config");
const UserModel = require("./user.model");

const User = UserModel(Database, Sequelize);

module.exports = {
  User,
  connection: Database,
};
