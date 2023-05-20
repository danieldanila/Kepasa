const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const periodService = require("../services").PeriodService;

const controller = {
  createPeriod: async (req, res) => {
    try {
      await periodService.createPeriod(req.body);
      res.status(201).json({ message: `Period ${req.body.name} created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultiplePeriods: async (req, res) => {
    try {
      await periodService.createMultiplePeriods(req.body);
      res.status(201).json({ message: `${req.body.length} periods created.` });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllPeriods: async (req, res) => {
    try {
      const periods = await periodService.getAllPeriods();
      res.status(200).json(periods);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getPeriodById: async (req, res) => {
    try {
      const period = await periodService.getPeriodById(req.params.id);
      res.status(200).json(period);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updatePeriod: async (req, res) => {
    try {
      const updatedPeriod = await periodService.updatePeriod(
        req.params.id,
        req.body
      );
      res.status(202).json(updatedPeriod);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deletePeriod: async (req, res) => {
    try {
      await periodService.deletePeriod(req.params.id);
      res.status(200).json({ message: "Period deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
