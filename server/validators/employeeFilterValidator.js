const Joi = require('joi');

const getEmployeesSchema = Joi.object({
    role: Joi.number().allow('').optional(),
    country: Joi.number().allow('').optional(),
    department: Joi.number().allow('').optional()
});

module.exports = {
    getEmployeesSchema
};
