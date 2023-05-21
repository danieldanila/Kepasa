const router = require("express").Router();
const objectiveController = require("../controllers").ObjectiveController;

router.post("/create", objectiveController.createObjective);
router.post("/creates", objectiveController.createMultipleObjectives);
router.get("/", objectiveController.getAllObjectives);
router.get("/:id", objectiveController.getObjectiveById);
router.put("/:id", objectiveController.updateObjective);
router.delete("/:id", objectiveController.deleteObjective);

module.exports = router;
