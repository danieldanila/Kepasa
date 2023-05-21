const router = require("express").Router();
const activityReportController =
  require("../controllers").ActivityReportController;

router.post("/create", activityReportController.createActivityReport);
router.post("/creates", activityReportController.createMultipleActivityReports);
router.get("/", activityReportController.getAllActivityReports);
router.get("/:id", activityReportController.getActivityReportById);
router.put("/:id", activityReportController.updateActivityReport);
router.delete("/:id", activityReportController.deleteActivityReport);
router.get("/:id/user", activityReportController.getActivityReportUser);
router.get("/:id/period", activityReportController.getActivityReportPeriod);
router.get("/:id/project", activityReportController.getActivityReportProject);
router.get("/:id/taskType", activityReportController.getActivityReportTaskType);

module.exports = router;
