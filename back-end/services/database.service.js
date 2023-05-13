const Database = require("../models").connection;

const sync = async () => {
  await Database.sync({ alter: true });
};

module.exports = {
  sync,
};
