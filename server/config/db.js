const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;