const Database = require("../models").connection;

const service = {
  sync: async () => {
    await Database.sync({ alter: true });
  },
};

module.exports = service;
