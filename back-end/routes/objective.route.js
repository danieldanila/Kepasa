const router = require("express").Router();
const objectiveController = require("../controllers").ObjectiveController;

router.post("/create", objectiveController.createObjective);
router.post("/creates", objectiveController.createMultipleObjectives);
router.get("/", objectiveController.getAllObjectives);
router.get("/:id", objectiveController.getObjectiveById);
router.put("/:id", objectiveController.updateObjective);
router.delete("/:id", objectiveController.deleteObjective);
router.get("/:id/user", objectiveController.getObjectiveUser);
router.get("/:id/period", objectiveController.getObjectivePeriod);

module.exports = router;
