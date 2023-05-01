module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      defaultVaue: DataTypes.UUIDV4,
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
  });
};
