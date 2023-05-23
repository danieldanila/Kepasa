const router = require("express").Router();
const taskTypeController = require("../controllers").TaskTypeController;

router.post("/create", taskTypeController.createTaskType);
router.post("/creates", taskTypeController.createMultipleTaskTypes);
router.get("/", taskTypeController.getAllTaskTypes);
router.get("/:id", taskTypeController.getTaskTypeById);
router.put("/:id", taskTypeController.updateTaskType);
router.delete("/:id", taskTypeController.deleteTaskType);
router.get(
  "/:id/activityReports",
  taskTypeController.getTaskTypeActivityReports
);
router.get(
  "/:id/activityReport/:idActivityReport",
  taskTypeController.getTaskTypeActivityReportById
);

module.exports = router;
