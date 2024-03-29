const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const User = require("./user.model");
const PeriodModel = require("./period.model");
const ProjectModel = require("./project.model");
const TaskTypeModel = require("./taskType.model");

const Period = PeriodModel(Database, Sequelize);
const Project = ProjectModel(Database, Sequelize);
const TaskType = TaskTypeModel(Database, Sequelize);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ActivityReport",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      investedTime: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      isSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      rejectJustification: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      idUser: {
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
        references: {
          model: User,
          key: "id",
        },
      },
      idApprover: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        validate: {
          isUUID: 4,
        },
        references: {
          model: User,
          key: "id",
        },
      },
      idPeriod: {
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
        references: {
          model: Period,
          key: "id",
        },
      },
      idProject: {
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
        references: {
          model: Project,
          key: "id",
        },
      },
      idTaskType: {
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
        references: {
          model: TaskType,
          key: "id",
        },
      },
    },
    {
      underscored: true,
      tableName: "Activity_Reports",
    }
  );
};
