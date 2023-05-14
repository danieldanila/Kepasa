const router = require("express").Router();
const roleController = require("../controllers").RoleController;

router.post("/create", roleController.createRole);
router.post("/creates", roleController.createMultipleRoles);
router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.get("/:id/department", roleController.getRoleDepartment);

module.exports = router;
