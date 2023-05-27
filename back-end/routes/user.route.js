const router = require("express").Router();
const userController = require("../controllers").UserController;

router.post("/create", userController.createUser);
router.post("/creates", userController.createMultipleUsers);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id/mentor", userController.getUserMentor);
router.get("/:id/mentees", userController.getUserMentees);
router.get("/:id/department", userController.getUserDepartment);
router.get("/:id/objectives", userController.getUserObjectives);
router.get("/:id/objective/:idObjective", userController.getUserObjectiveById);
router.get("/:id/mentees/objectives", userController.getUserMenteesObjectives);
router.get(
  "/:id/mentee/:idMentee/objectives",
  userController.getUserMenteeObjectives
);
router.get(
  "/:id/mentee/:idMentee/objective/:idObjective",
  userController.getUserMenteeObjectiveById
);
router.get("/:id/activityReports", userController.getUserActivityReports);
router.get(
  "/:id/activityReport/:idActivityReport",
  userController.getUserActivityReportById
);
router.get(
  "/:id/subUsersActivityReports",
  userController.getUserSubUsersActivityReports
);

module.exports = router;
