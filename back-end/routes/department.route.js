const router = require("express").Router();
const departmentController = require("../controllers/department.controller");

router.post("/create", departmentController.createDepartment);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);
router.get("/:id/users", departmentController.getDepartmentUsers);

module.exports = router;
