const Database = require("../models").connection;

const sync = async (req, res, next) => {
  await Database.sync({ alter: true });
};

module.exports = {
  sync,
};
