const router = require("express").Router();
const periodController = require("../controllers").PeriodController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  periodController.createPeriod
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  periodController.createMultiplePeriods
);
router.get(
  "/",
  authenticationMiddleware.protect,
  periodController.getAllPeriods
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  periodController.getPeriodById
);
router.get(
  "/date/:date",
  authenticationMiddleware.protect,
  periodController.getPeriodByDate
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  periodController.updatePeriod
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  periodController.deletePeriod
);
router.get(
  "/:id/objectives",
  authenticationMiddleware.protect,
  periodController.getPeriodObjectives
);
router.get(
  "/:id/objective/:idObjective",
  authenticationMiddleware.protect,
  periodController.getPeriodObjectiveById
);
router.get(
  "/:id/activityReports",
  authenticationMiddleware.protect,
  periodController.getPeriodActivityReports
);
router.get(
  "/:id/activityReport/:idActivityReport",
  authenticationMiddleware.protect,
  periodController.getPeriodActivityReportById
);

module.exports = router;
