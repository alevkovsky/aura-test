const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {
    const { role, country, department } = req.query;

    // Parse filter values
    const roleFilter = employeeService.parseFilterValues(role);
    const countryFilter = employeeService.parseFilterValues(country);
    const departmentFilter = employeeService.parseFilterValues(department);

    try {
        const employees = await employeeService.getFilteredEmployees(roleFilter, countryFilter, departmentFilter);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFilters = async (req, res) => {
    try {
        const filters = await employeeService.getFilters();
        res.json(filters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEmployees,
    getFilters
};
