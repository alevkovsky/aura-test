import React from 'react';
import './EmployeesTable.css';

const EmployeeTable = ({ employees }) => {
    return (
        <div className="table-container">
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
                        <tr key={index}>
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
