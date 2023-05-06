const Database = require("../models").connection;

const sync = async (req, res, next) => {
  await Database.sync({ force: true });
};

module.exports = {
  sync,
};
