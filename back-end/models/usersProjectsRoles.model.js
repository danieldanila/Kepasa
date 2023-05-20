const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const UserModel = require("./user.model");
const ProjectModel = require("./project.model");
const RoleModel = require("./role.model");

const User = UserModel(Database, Sequelize);
const Project = ProjectModel(Database, Sequelize);
const Role = RoleModel(Database, Sequelize);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "UsersProjectsRoles",
    {
      idUser: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: "usersProjectsRolesCompositeIndex",
        validate: {
          isUUID: 4,
        },
        references: {
          model: User,
          key: "id",
        },
      },
      idProject: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: "usersProjectsRolesCompositeIndex",
        validate: {
          isUUID: 4,
        },
        references: {
          model: Project,
          key: "id",
        },
      },
      idRole: {
        type: DataTypes.UUID,
        allowNull: false,
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
      underscored: true,
      tableName: "Users_Projects_Roles",
      indexes: [
        {
          unique: true,
          fields: ["id_user", "id_project"],
          name: "usersProjectsRolesCompositeIndex",
        },
      ],
    }
  );
};
