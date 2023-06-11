const activityReportService = require("../services").ActivityReportService;
const catchAsync = require("../utils/catchAsync.util");

const controller = {
  createActivityReport: catchAsync(async (req, res, next) => {
    await activityReportService.createActivityReport(req.body);
    res.status(201).json({
      message: `Activity Report ${req.body.name} created.`,
    });
  }),

  createMultipleActivityReports: catchAsync(async (req, res, next) => {
    await activityReportService.createMultipleActivityReports(req.body);
    res.status(201).json({
      message: `${req.body.length} activity reports created.`,
    });
  }),

  getAllActivityReports: catchAsync(async (req, res, next) => {
    const objectives = await activityReportService.getAllActivityReports();
    res.status(200).json(objectives);
  }),

  getActivityReportById: catchAsync(async (req, res, next) => {
    const activityReport = await activityReportService.getActivityReportById(
      req.params.id
    );
    res.status(200).json(activityReport);
  }),

  updateActivityReport: catchAsync(async (req, res, next) => {
    const updatedActivityReport =
      await activityReportService.updateActivityReport(req.params.id, req.body);
    res
      .status(202)
      .json({
        data: updatedActivityReport,
        message: "Activity report updated successfully.",
      });
  }),

  deleteActivityReport: catchAsync(async (req, res, next) => {
    await activityReportService.deleteActivityReport(req.params.id);
    res.status(200).json({ message: "Activity Report deleted." });
  }),

  getActivityReportUser: catchAsync(async (req, res, next) => {
    const activityReportUser =
      await activityReportService.getActivityReportUser(req.params.id);
    res.status(200).json(activityReportUser);
  }),

  getActivityReportPeriod: catchAsync(async (req, res, next) => {
    const activityReportPeriod =
      await activityReportService.getActivityReportPeriod(req.params.id);
    res.status(200).json(activityReportPeriod);
  }),

  getActivityReportProject: catchAsync(async (req, res, next) => {
    const activityReportProject =
      await activityReportService.getActivityReportProject(req.params.id);
    res.status(200).json(activityReportProject);
  }),

  getActivityReportTaskType: catchAsync(async (req, res, next) => {
    const activityReportTaskType =
      await activityReportService.getActivityReportTaskType(req.params.id);
    res.status(200).json(activityReportTaskType);
  }),
};

module.exports = controller;
