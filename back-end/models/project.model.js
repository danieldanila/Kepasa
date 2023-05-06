module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Project",
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
        unique: true,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      underscored: true,
      tableName: "Projects",
    }
  );
};
