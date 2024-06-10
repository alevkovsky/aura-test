const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// employees
router.get('/', employeeController.getEmployees);

// filters values
router.get('/filters', employeeController.getFilters);

module.exports = router;
