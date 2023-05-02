const router = require("express").Router();
const departmentController = require("../controllers/department.controller");

router.post("/create", departmentController.createDepartment);

module.exports = router;
