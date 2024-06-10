const { Op } = require('sequelize');
const { Employee, Role, Country, Department, sequelize } = require('../models');

const parseFilterValues = (value) => value ? value.split(',') : [];


const getFilteredEmployees = async (roleFilter, countryFilter, departmentFilter) => {
    // Build the where clause dynamically
    const where = {};
    if (roleFilter.length) where['$Role.name$'] = { [Op.in]: roleFilter };
    if (countryFilter.length) where['$Country.name$'] = { [Op.in]: countryFilter };
    if (departmentFilter.length) where['$Department.name$'] = { [Op.in]: departmentFilter };

    return Employee.findAll({
        include: [
            { model: Role, attributes: [], where: roleFilter.length ? { name: { [Op.in]: roleFilter } } : {} },
            { model: Country, attributes: [], where: countryFilter.length ? { name: { [Op.in]: countryFilter } } : {} },
            { model: Department, attributes: [], where: departmentFilter.length ? { name: { [Op.in]: departmentFilter } } : {} }
        ],
        attributes: [
            'id',
            'first_name',
            'last_name',
            [sequelize.col('Role.name'), 'role'],
            [sequelize.col('Country.name'), 'country'],
            [sequelize.col('Department.name'), 'department']
        ],
        where
    });
};

// Get filters
const getFilters = async () => {
    const [roles, countries, departments] = await Promise.all([
        Role.findAll({ attributes: ['name'] }),
        Country.findAll({ attributes: ['name'] }),
        Department.findAll({ attributes: ['name'] })
    ]);

    return {
        roles: roles.map(role => role.name),
        countries: countries.map(country => country.name),
        departments: departments.map(department => department.name)
    };
};

module.exports = {
    parseFilterValues,
    getFilteredEmployees,
    getFilters
};
