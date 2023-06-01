const catchAsync = require("../utils/catchAsync.util");
const objectiveService = require("../services").ObjectiveService;

const controller = {
  createObjective: catchAsync(async (req, res, next) => {
    await objectiveService.createObjective(req.body);
    res.status(201).json({
      message: `Objective ${req.body.name} created.`,
    });
  }),

  createMultipleObjectives: catchAsync(async (req, res, next) => {
    await objectiveService.createMultipleObjectives(req.body);
    res.status(201).json({
      message: `${req.body.length} objectives created.`,
    });
  }),

  getAllObjectives: catchAsync(async (req, res, next) => {
    const objectives = await objectiveService.getAllObjectives();
    res.status(200).json(objectives);
  }),

  getObjectiveById: catchAsync(async (req, res, next) => {
    const objective = await objectiveService.getObjectiveById(req.params.id);
    res.status(200).json(objective);
  }),

  updateObjective: catchAsync(async (req, res, next) => {
    const updatedObjective = await objectiveService.updateObjective(
      req.params.id,
      req.body
    );
    res.status(202).json(updatedObjective);
  }),

  deleteObjective: catchAsync(async (req, res, next) => {
    await objectiveService.deleteObjective(req.params.id);
    res.status(200).json({ message: "Objective deleted." });
  }),

  getObjectiveUser: catchAsync(async (req, res, next) => {
    const objectiveUser = await objectiveService.getObjectiveUser(
      req.params.id
    );
    res.status(200).json(objectiveUser);
  }),

  getObjectivePeriod: catchAsync(async (req, res, next) => {
    const objectivePeriod = await objectiveService.getObjectivePeriod(
      req.params.id
    );
    res.status(200).json(objectivePeriod);
  }),
};

module.exports = controller;
