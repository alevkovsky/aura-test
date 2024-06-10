const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Employee = require('./employee')(sequelize, Sequelize);
const Role = require('./role')(sequelize, Sequelize);
const Country = require('./country')(sequelize, Sequelize);
const Department = require('./department')(sequelize, Sequelize);

Role.hasMany(Employee, { foreignKey: 'role_id' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });

Country.hasMany(Employee, { foreignKey: 'country_id' });
Employee.belongsTo(Country, { foreignKey: 'country_id' });

Department.hasMany(Employee, { foreignKey: 'department_id' });
Employee.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = {
    sequelize,
    Employee,
    Role,
    Country,
    Department
};