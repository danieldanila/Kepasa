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
      idRole: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: "roleProjectsCompositeIndex",
        validate: {
          isUUID: 4,
        },
        references: {
          model: Role,
          key: "id",
        },
      },
      idProject: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: "roleProjectsCompositeIndex",
        validate: {
          isUUID: 4,
        },
        references: {
          model: Project,
          key: "id",
        },
      },
      hourlyPay: {
        type: DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
    },
    {
      underscored: true,
      tableName: "Roles_Projects",
      indexes: [
        {
          unique: true,
          fields: ["id_role", "id_project"],
          name: "roleProjectsCompositeIndex",
        },
      ],
    }
  );
};
