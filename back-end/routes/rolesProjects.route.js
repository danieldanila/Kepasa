const router = require("express").Router();
const rolesProjectsController =
  require("../controllers").RolesProjectsController;

router.post("/create", rolesProjectsController.createRolesProjects);
router.post("/creates", rolesProjectsController.createMultipleRolesProjects);
router.get("/", rolesProjectsController.getAllRolesProjects);
router.get(
  "/role/:idRole/project/:idProject",
  rolesProjectsController.getRolesProjectsByCompositeId
);
router.put(
  "/role/:idRole/project/:idProject",
  rolesProjectsController.updateRolesProjects
);
router.delete(
  "/role/:idRole/project/:idProject",
  rolesProjectsController.deleteRolesProjects
);
router.get("/role/:idRole/project", rolesProjectsController.getRoleProjects);
router.get("/project/:idProject/role", rolesProjectsController.getProjectRoles);
router.get(
  "/role/:idRole/project/:idProject/hourlyPay",
  rolesProjectsController.getRoleProjectHourlyPay
);

module.exports = router;
