module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: DataTypes.INTEGER,
        country_id: DataTypes.INTEGER,
        department_id: DataTypes.INTEGER
    }, {
        tableName: 'employees',
        timestamps: false
    });

    return Employee;
};
