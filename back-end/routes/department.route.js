const router = require("express").Router();
const departmentController = require("../controllers").DepartmentController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  departmentController.createDepartment
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  departmentController.createMultipleDepartments
);
router.get(
  "/",
  authenticationMiddleware.protect,
  departmentController.getAllDepartments
);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  departmentController.getDepartmentById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  departmentController.updateDepartment
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  departmentController.deleteDepartment
);
router.get(
  "/:id/users",
  authenticationMiddleware.protect,
  departmentController.getDepartmentUsers
);
router.get(
  "/:id/roles",
  authenticationMiddleware.protect,
  departmentController.getDeparmentRoles
);

module.exports = router;
