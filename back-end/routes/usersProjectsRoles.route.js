const router = require("express").Router();
const usersProjectsRolesController =
  require("../controllers").UsersProjectsRolesController;

router.post("/create", usersProjectsRolesController.createUsersProjectRoles);
router.post(
  "/creates",
  usersProjectsRolesController.createMultipleUsersProjectsRoles
);
router.get("/", usersProjectsRolesController.getAllUsersProjectsRoles);
router.get(
  "/:idUser/:idProject",
  usersProjectsRolesController.getUsersProjectsRolesByCompositeId
);
router.put(
  "/:idUser/:idProject",
  usersProjectsRolesController.updateUsersProjectsRoles
);
router.delete(
  "/:idUser/:idProject",
  usersProjectsRolesController.deleteUsersProjectsRoles
);

module.exports = router;
