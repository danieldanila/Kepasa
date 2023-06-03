const router = require("express").Router();
const rolesProjectsController =
  require("../controllers").RolesProjectsController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  rolesProjectsController.createRolesProjects
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  rolesProjectsController.createMultipleRolesProjects
);
router.get(
  "/",
  authenticationMiddleware.protect,
  rolesProjectsController.getAllRolesProjects
);
router.get(
  "/role/:idRole/project/:idProject",
  authenticationMiddleware.protect,
  rolesProjectsController.getRolesProjectsByCompositeId
);
router.put(
  "/role/:idRole/project/:idProject",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  rolesProjectsController.updateRolesProjects
);
router.delete(
  "/role/:idRole/project/:idProject",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  rolesProjectsController.deleteRolesProjects
);
router.get(
  "/role/:idRole/project",
  authenticationMiddleware.protect,
  rolesProjectsController.getRoleProjects
);
router.get(
  "/project/:idProject/role",
  authenticationMiddleware.protect,
  rolesProjectsController.getProjectRoles
);
router.get(
  "/role/:idRole/project/:idProject/hourlyPay",
  authenticationMiddleware.protect,
  rolesProjectsController.getRoleProjectHourlyPay
);

module.exports = router;
