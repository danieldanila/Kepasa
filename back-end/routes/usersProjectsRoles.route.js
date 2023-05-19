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
  "/user/:idUser/project/:idProject",
  usersProjectsRolesController.getUsersProjectsRolesByCompositeId
);
router.put(
  "/user/:idUser/project/:idProject",
  usersProjectsRolesController.updateUsersProjectsRoles
);
router.delete(
  "/user/:idUser/project/:idProject",
  usersProjectsRolesController.deleteUsersProjectsRoles
);
router.get(
  "/user/:idUser/project",
  usersProjectsRolesController.getUserProjects
);
router.get(
  "/project/:idProject/user",
  usersProjectsRolesController.getProjectUsers
);
router.get(
  "/user/:idUser/project/:idProject/role",
  usersProjectsRolesController.getUserRoleOnProject
);
router.get("/user/:idUser/role", usersProjectsRolesController.getUserRoles);
router.get("/role/:idRole/user", usersProjectsRolesController.getRoleUsers);
router.get(
  "/project/:idProject/role",
  usersProjectsRolesController.getProjectRoles
);
router.get(
  "/role/:idRole/project",
  usersProjectsRolesController.getRoleProjects
);

module.exports = router;
