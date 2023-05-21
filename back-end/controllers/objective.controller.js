const objectiveService = require("../services").ObjectiveService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createObjective: async (req, res) => {
    try {
      await objectiveService.createObjective(req.body);
      res.status(201).json({
        message: `Objective ${req.body.name} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleObjectives: async (req, res) => {
    try {
      await objectiveService.createMultipleObjectives(req.body);
      res.status(201).json({
        message: `${req.body.length} objectives created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllObjectives: async (req, res) => {
    try {
      const objectives = await objectiveService.getAllObjectives();
      res.status(200).json(objectives);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getObjectiveById: async (req, res) => {
    try {
      const objective = await objectiveService.getObjectiveById(req.params.id);
      res.status(200).json(objective);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateObjective: async (req, res) => {
    try {
      const updatedObjective = await objectiveService.updateObjective(
        req.params.id,
        req.body
      );
      res.status(202).json(updatedObjective);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteObjective: async (req, res) => {
    try {
      await objectiveService.deleteObjective(req.params.id);
      res.status(200).json({ message: "Objective deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
