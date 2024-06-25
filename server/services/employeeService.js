const { Op } = require('sequelize');
const { Employee, Role, Country, Department, sequelize } = require('../models');

const parseFilterValues = (value) => value ? value.split(',') : [];


const getFilteredEmployees = async (roleFilter, countryFilter, departmentFilter) => {
    // Build the where clause dynamically
    const where = {};
    if (roleFilter.length) where.role_id = { [Op.in]: roleFilter };
    if (countryFilter.length) where.country_id = { [Op.in]: countryFilter };
    if (departmentFilter.length) where.department_id = { [Op.in]: departmentFilter };

    const employees = await Employee.findAll({
        include: [
            { model: Role, attributes: ['name'] },
            { model: Country, attributes: ['name'] },
            { model: Department, attributes: ['name'] }
        ],
        where
    });

    return employees.map(employee => ({
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        role: employee.Role.name,
        country: employee.Country.name,
        department: employee.Department.name
    }));
};

// Get filters
const getFilters = async () => {
    const [roles, countries, departments] = await Promise.all([
        Role.findAll({ attributes: ['id', 'name'] }),
        Country.findAll({ attributes: ['id', 'name'] }),
        Department.findAll({ attributes: ['id', 'name'] })
    ]);

    return {
        roles,
        countries,
        departments
    };
};

module.exports = {
    parseFilterValues,
    getFilteredEmployees,
    getFilters
};
