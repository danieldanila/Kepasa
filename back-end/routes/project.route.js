const router = require("express").Router();
const projectController = require("../controllers").ProjectController;

router.post("/create", projectController.createProject);
router.post("/creates", projectController.createMultipleProjects);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
