const catchAsync = require("../utils/catchAsync.util");
const periodService = require("../services").PeriodService;

const controller = {
  createPeriod: catchAsync(async (req, res, next) => {
    await periodService.createPeriod(req.body);
    res.status(201).json({ message: `Period ${req.body.name} created.` });
  }),

  createMultiplePeriods: catchAsync(async (req, res, next) => {
    await periodService.createMultiplePeriods(req.body);
    res.status(201).json({ message: `${req.body.length} periods created.` });
  }),

  getAllPeriods: catchAsync(async (req, res, next) => {
    const periods = await periodService.getAllPeriods();
    res.status(200).json(periods);
  }),

  getPeriodById: catchAsync(async (req, res, next) => {
    const period = await periodService.getPeriodById(req.params.id);
    res.status(200).json(period);
  }),

  updatePeriod: catchAsync(async (req, res, next) => {
    const updatedPeriod = await periodService.updatePeriod(
      req.params.id,
      req.body
    );
    res
      .status(202)
      .json({
        data: updatedPeriod,
        message: `${updatedPeriod.name} updated successfully.`,
      });
  }),

  deletePeriod: catchAsync(async (req, res, next) => {
    await periodService.deletePeriod(req.params.id);
    res.status(200).json({ message: "Period deleted." });
  }),

  getPeriodObjectives: catchAsync(async (req, res, next) => {
    const periodObjectives = await periodService.getPeriodObjectives(
      req.params.id
    );
    res.status(200).json(periodObjectives);
  }),

  getPeriodObjectiveById: catchAsync(async (req, res, next) => {
    const periodObjective = await periodService.getPeriodObjectiveById(
      req.params.id,
      req.params.idObjective
    );
    res.status(200).json(periodObjective);
  }),

  getPeriodActivityReports: catchAsync(async (req, res, next) => {
    const periodActivityReports = await periodService.getPeriodActivityReports(
      req.params.id
    );
    res.status(200).json(periodActivityReports);
  }),

  getPeriodActivityReportById: catchAsync(async (req, res, next) => {
    const periodActivityReport =
      await periodService.getPeriodActivityReportById(
        req.params.id,
        req.params.idActivityReport
      );
    res.status(200).json(periodActivityReport);
  }),
};

module.exports = controller;
