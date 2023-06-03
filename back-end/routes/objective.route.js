const router = require("express").Router();
const objectiveController = require("../controllers").ObjectiveController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  objectiveController.createObjective
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  objectiveController.createMultipleObjectives
);
router.get(
  "/",
  authenticationMiddleware.protect,
  objectiveController.getAllObjectives
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  objectiveController.getObjectiveById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  objectiveController.updateObjective
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  objectiveController.deleteObjective
);
router.get(
  "/:id/user",
  authenticationMiddleware.protect,
  objectiveController.getObjectiveUser
);
router.get(
  "/:id/period",
  authenticationMiddleware.protect,
  objectiveController.getObjectivePeriod
);

module.exports = router;
