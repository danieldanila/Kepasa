const databaseService = require("../services/database.service");

const sync = async (req, res, next) => {
  try {
    await databaseService.sync(req, res, next);
    res.status(200).json({ message: "Database sync was done successfully." });
  } catch (err) {
    const errorMessage = `Error while trying to sync the database: ${err.message}.`;
    console.error(errorMessage);
    res.status(500).json({ message: errorMessage });
    next(err);
  }
};

module.exports = {
  sync,
};
