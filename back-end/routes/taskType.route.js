const router = require("express").Router();
const taskTypeController = require("../controllers").TaskTypeController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  taskTypeController.createTaskType
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  taskTypeController.createMultipleTaskTypes
);
router.get(
  "/",
  authenticationMiddleware.protect,
  taskTypeController.getAllTaskTypes
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  taskTypeController.getTaskTypeById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  taskTypeController.updateTaskType
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  taskTypeController.deleteTaskType
);
router.get(
  "/:id/activityReports",
  authenticationMiddleware.protect,
  taskTypeController.getTaskTypeActivityReports
);
router.get(
  "/:id/activityReport/:idActivityReport",
  authenticationMiddleware.protect,
  taskTypeController.getTaskTypeActivityReportById
);

module.exports = router;
