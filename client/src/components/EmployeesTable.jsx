import React from 'react';
import './EmployeesTable.css';

const EmployeeTable = ({ employees }) => {
    return (
        <div className="table-container" data-testid="employee-table">
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Country</th>
                        <th>Department</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index} data-testid="employee-row">
                            <td>{employee.id}</td>
                            <td>{employee.country}</td>
                            <td>{employee.department}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
