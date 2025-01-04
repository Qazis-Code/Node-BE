const express = require('express');
const router = express.Router();
var employeeController = require('../src/employee/employeeController');

router.route('/employee/create').post(employeeController.createUserControllerFunction);
router.route('/employee/getAll').get(employeeController.getUserControllerFunction);
router.route('/employee/delete').delete(employeeController.deleteUserControllerFunction);
router.route('/employee/update').put(employeeController.updateUserControllerFunction);

module.exports = router;