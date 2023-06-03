const router = require("express").Router();
const projectController = require("../controllers").ProjectController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  projectController.createProject
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  projectController.createMultipleProjects
);
router.get(
  "/",
  authenticationMiddleware.protect,
  projectController.getAllProjects
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  projectController.getProjectById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  projectController.updateProject
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  projectController.deleteProject
);
router.get(
  "/:id/activityReports",
  authenticationMiddleware.protect,
  projectController.getProjectActivityReports
);
router.get(
  "/:id/activityReport/:idActivityReport",
  authenticationMiddleware.protect,
  projectController.getProjectActivityReportById
);

module.exports = router;
