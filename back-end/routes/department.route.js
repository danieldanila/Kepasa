const router = require("express").Router();
const departmentController = require("../controllers").DepartmentController;

router.post("/create", departmentController.createDepartment);
router.post("/creates", departmentController.createMultipleDepartments);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);
router.get("/:id/users", departmentController.getDepartmentUsers);

module.exports = router;
