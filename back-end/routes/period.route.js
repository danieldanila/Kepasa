const router = require("express").Router();
const periodController = require("../controllers").PeriodController;

router.post("/create", periodController.createPeriod);
router.post("/creates", periodController.createMultiplePeriods);
router.get("/", periodController.getAllPeriods);
router.get("/:id", periodController.getPeriodById);
router.put("/:id", periodController.updatePeriod);
router.delete("/:id", periodController.deletePeriod);
router.get("/:id/objectives", periodController.getPeriodObjectives);
router.get(
  "/:id/objective/:idObjective",
  periodController.getPeriodObjectiveById
);

module.exports = router;
