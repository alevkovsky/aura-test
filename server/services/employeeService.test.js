const employeeService = require('./employeeService');
const { Employee, Role, Country, Department } = require('../models');
const { Op } = require('sequelize');

jest.mock('../models', () => ({
    Employee: {
        findAll: jest.fn()
    },
    Role: {},
    Country: {},
    Department: {}
}));

describe('employeeService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getFilteredEmployees', () => {
        it('should fetch employees with the specified filters', async () => {
            const mockEmployees = [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    Role: { name: 'Manager' },
                    Country: { name: 'United States' },
                    Department: { name: 'IT' }
                },
                {
                    first_name: 'Jane',
                    last_name: 'Smith',
                    Role: { name: 'Analyst' },
                    Country: { name: 'Germany' },
                    Department: { name: 'Engineering' }
                }
            ];

            Employee.findAll.mockResolvedValue(mockEmployees);

            const result = await employeeService.getFilteredEmployees(['Manager'], ['United States'], ['IT']);

            expect(Employee.findAll).toHaveBeenCalledWith({
                where: {
                    role_id: {
                        [Op.in]: ['Manager']
                    },
                    country_id: {
                        [Op.in]: ['United States']
                    },
                    department_id: {
                        [Op.in]: ['IT']
                    }
                },
                include: [
                    { model: Role, attributes: ['name'] },
                    { model: Country, attributes: ['name'] },
                    { model: Department, attributes: ['name'] }
                ]
            });

            expect(result).toEqual([
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    role: 'Manager',
                    country: 'United States',
                    department: 'IT'
                },
                {
                    first_name: 'Jane',
                    last_name: 'Smith',
                    role: 'Analyst',
                    country: 'Germany',
                    department: 'Engineering'
                }
            ]);
        });

        it('should handle errors and throw them', async () => {
            const error = new Error('Some error');
            Employee.findAll.mockRejectedValue(error);

            await expect(employeeService.getFilteredEmployees(['Manager'], ['United States'], ['IT'])).rejects.toThrow('Some error');
        });
    });
});
