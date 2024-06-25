const employeeService = require('../services/employeeService');
const { getEmployeesSchema } = require('../validators/employeeFilterValidator');

const getEmployees = async (req, res, next) => {
    try {
        await getEmployeesSchema.validateAsync(req.query);
        const { role, country, department } = req.query;
        const roleFilter = employeeService.parseFilterValues(role);
        const countryFilter = employeeService.parseFilterValues(country);
        const departmentFilter = employeeService.parseFilterValues(department);
        const employees = await employeeService.getFilteredEmployees(roleFilter, countryFilter, departmentFilter);
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

const getFilters = async (req, res, next) => {
    try {
        const filters = await employeeService.getFilters();
        res.json(filters);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getEmployees,
    getFilters
};
