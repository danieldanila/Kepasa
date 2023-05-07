const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/create", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id/mentor", userController.getUserMentor);

module.exports = router;
