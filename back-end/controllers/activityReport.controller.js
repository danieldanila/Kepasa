const activityReportService = require("../services").ActivityReportService;
const { errorsHandlerWrapper } = require("../utils/errorsHandlers.util");

const controller = {
  createActivityReport: async (req, res) => {
    try {
      await activityReportService.createActivityReport(req.body);
      res.status(201).json({
        message: `Activity Report ${req.body.name} created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  createMultipleActivityReports: async (req, res) => {
    try {
      await activityReportService.createMultipleActivityReports(req.body);
      res.status(201).json({
        message: `${req.body.length} activity reports created.`,
      });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getAllActivityReports: async (req, res) => {
    try {
      const objectives = await activityReportService.getAllActivityReports();
      res.status(200).json(objectives);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getActivityReportById: async (req, res) => {
    try {
      const activityReport = await activityReportService.getActivityReportById(
        req.params.id
      );
      res.status(200).json(activityReport);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  updateActivityReport: async (req, res) => {
    try {
      const updatedActivityReport =
        await activityReportService.updateActivityReport(
          req.params.id,
          req.body
        );
      res.status(202).json(updatedActivityReport);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  deleteActivityReport: async (req, res) => {
    try {
      await activityReportService.deleteActivityReport(req.params.id);
      res.status(200).json({ message: "Activity Report deleted." });
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getActivityReportUser: async (req, res) => {
    try {
      const activityReportUser =
        await activityReportService.getActivityReportUser(req.params.id);
      res.status(200).json(activityReportUser);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getActivityReportPeriod: async (req, res) => {
    try {
      const activityReportPeriod =
        await activityReportService.getActivityReportPeriod(req.params.id);
      res.status(200).json(activityReportPeriod);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getActivityReportProject: async (req, res) => {
    try {
      const activityReportProject =
        await activityReportService.getActivityReportProject(req.params.id);
      res.status(200).json(activityReportProject);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },

  getActivityReportTaskType: async (req, res) => {
    try {
      const activityReportTaskType =
        await activityReportService.getActivityReportTaskType(req.params.id);
      res.status(200).json(activityReportTaskType);
    } catch (err) {
      errorsHandlerWrapper(res, err);
    }
  },
};

module.exports = controller;
