const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const UserModel = require("./user.model");
const RoleModel = require("./role.model");

const User = UserModel(Database, Sequelize);
const Role = RoleModel(Database, Sequelize);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "UsersRoles",
    {
      id_user: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        references: {
          model: User,
          key: "id",
        },
      },
      id_role: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        references: {
          model: Role,
          key: "id",
        },
      },
    },
    {
      tableName: "Users_Roles",
    }
  );
};
