const router = require("express").Router();
const roleController = require("../controllers").RoleController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  roleController.createRole
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  roleController.createMultipleRoles
);
router.get("/", authenticationMiddleware.protect, roleController.getAllRoles);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  roleController.getRoleById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  roleController.updateRole
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  roleController.deleteRole
);
router.get(
  "/:id/department",
  authenticationMiddleware.protect,
  roleController.getRoleDepartment
);
router.get(
  "/:id/superior",
  authenticationMiddleware.protect,
  roleController.getRoleSuperiorRole
);
router.get(
  "/:id/sub",
  authenticationMiddleware.protect,
  roleController.getRoleSubRoles
);

module.exports = router;
