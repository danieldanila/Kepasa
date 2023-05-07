const Database = require("../models").connection;

const sync = async (req, res) => {
  await Database.sync({ alter: true });
};

module.exports = {
  sync,
};
