const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const RoleModel = require("./role.model");
const ProjectModel = require("./project.model");

const Project = ProjectModel(Database, Sequelize);
const Role = RoleModel(Database, Sequelize);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "RolesProjects",
    {
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
      id_project: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        references: {
          model: Project,
          key: "id",
        },
      },
      hourly_pay: {
        type: DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
    },
    {
      tableName: "Roles_Projects",
    }
  );
};
