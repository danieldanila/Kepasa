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

module.exports = router;
