module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'employees',
        timestamps: false
    });

    return Employee;
};
