const router = require("express").Router();
const activityReportController =
  require("../controllers").ActivityReportController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  activityReportController.createActivityReport
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  activityReportController.createMultipleActivityReports
);
router.get(
  "/",
  authenticationMiddleware.protect,
  activityReportController.getAllActivityReports
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  activityReportController.getActivityReportById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  activityReportController.updateActivityReport
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  activityReportController.deleteActivityReport
);
router.get(
  "/:id/user",
  authenticationMiddleware.protect,
  activityReportController.getActivityReportUser
);
router.get(
  "/:id/period",
  authenticationMiddleware.protect,
  activityReportController.getActivityReportPeriod
);
router.get(
  "/:id/project",
  authenticationMiddleware.protect,
  activityReportController.getActivityReportProject
);
router.get(
  "/:id/taskType",
  authenticationMiddleware.protect,
  activityReportController.getActivityReportTaskType
);

module.exports = router;
