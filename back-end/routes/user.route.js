const router = require("express").Router();
const userController = require("../controllers").UserController;
const authenticationMiddleware =
  require("../middlewares").AuthenticationMiddleware;

router.post(
  "/create",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  userController.createUser
);
router.post(
  "/creates",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  userController.createMultipleUsers
);
router.get("/", userController.getAllUsers);
router.get(
  "/:id",
  authenticationMiddleware.protect,
  userController.getUserById
);
router.put(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  userController.updateUser
);
router.patch(
  "/updateMe",
  authenticationMiddleware.protect,
  userController.updateMe
);
router.delete(
  "/:id",
  authenticationMiddleware.protect,
  authenticationMiddleware.restrictToAdministrator,
  userController.deleteUser
);
router.get(
  "/:id/mentor",

  userController.getUserMentor
);
router.get(
  "/:id/mentees",
  authenticationMiddleware.protect,
  userController.getUserMentees
);
router.get("/:id/department", userController.getUserDepartment);
router.get(
  "/:id/objectives",
  authenticationMiddleware.protect,
  userController.getUserObjectives
);
router.get(
  "/:id/objective/:idObjective",
  authenticationMiddleware.protect,
  userController.getUserObjectiveById
);
router.get(
  "/:id/mentees/objectives",
  authenticationMiddleware.protect,
  userController.getUserMenteesObjectives
);
router.get(
  "/:id/mentee/:idMentee/objectives",
  authenticationMiddleware.protect,
  userController.getUserMenteeObjectives
);
router.get(
  "/:id/mentee/:idMentee/objective/:idObjective",
  authenticationMiddleware.protect,
  userController.getUserMenteeObjectiveById
);
router.get(
  "/:id/activityReports",
  authenticationMiddleware.protect,
  userController.getUserActivityReports
);
router.get(
  "/:id/activityReport/:idActivityReport",
  authenticationMiddleware.protect,
  userController.getUserActivityReportById
);
router.get(
  "/:id/subUsersActivityReports",
  authenticationMiddleware.protect,
  userController.getUserSubUsersActivityReports
);

module.exports = router;
