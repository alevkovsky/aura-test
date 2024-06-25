const employeeController = require('./employeeController');
const employeeService = require('../services/employeeService');
const { getEmployeesSchema } = require('../validators/employeeFilterValidator');

jest.mock('../services/employeeService', () => ({
    getFilteredEmployees: jest.fn(),
    parseFilterValues: (value) => value ? value.split(',') : []
}));
jest.mock('../validators/employeeFilterValidator', () => ({
    getEmployeesSchema: {
        validateAsync: jest.fn()
    }
}));

describe('employeeController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getEmployees', () => {
        test('should return employees', async () => {
            const mockEmployees = [
                { first_name: 'John', last_name: 'Doe', role: 'Manager', country: 'United States', department: 'IT' },
                { first_name: 'Jane', last_name: 'Smith', role: 'Analyst', country: 'Germany', department: 'Engineering' }
            ];
            employeeService.getFilteredEmployees.mockResolvedValue(mockEmployees);
            getEmployeesSchema.validateAsync.mockResolvedValue({ role: 'Manager', country: 'United States', department: 'IT' });


            const req = {
                query: {
                    role: 'Manager',
                    country: 'United States',
                    department: 'IT'
                }
            };
            const res = {
                json: jest.fn(),
            };
            const next = jest.fn();

            await employeeController.getEmployees(req, res, next);

            expect(employeeService.getFilteredEmployees).toHaveBeenCalledWith(
                ['Manager'],
                ['United States'],
                ['IT']
            );
            expect(res.json).toHaveBeenCalledWith(mockEmployees);
        });

        test('should handle errors and call next with error', async () => {
            const error = new Error('Something went wrong');
            employeeService.getFilteredEmployees.mockRejectedValue(error);

            const req = {
                query: {
                    role: 'Manager',
                    country: 'United States',
                    department: 'IT'
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            const next = jest.fn();

            await employeeController.getEmployees(req, res, next);

            expect(employeeService.getFilteredEmployees).toHaveBeenCalledWith(
                ['Manager'],
                ['United States'],
                ['IT']
            );
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
