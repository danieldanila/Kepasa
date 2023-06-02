const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const User = require("./user.model");
const PeriodModel = require("./period.model");

const Period = PeriodModel(Database, Sequelize);

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Objective",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    },
    {
      underscored: true,
      tableName: "Objectives",
    }
  );
};
