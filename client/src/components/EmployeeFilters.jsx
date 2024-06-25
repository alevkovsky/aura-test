import React from 'react';
import FilterValue from '../reusable/FilterValue';
import './EmployeeFilters.css';

const EmployeeFilters = ({ filters, selectedFilters, handleFilterChange }) => {
    return (
        <div className="filters" data-testid="employee-filters">
            <div className="filter-section">
                <h3>Country</h3>
                {filters.countries.map(country => (
                    <FilterValue
                        key={country.id}
                        label={country.name}
                        name="countries"
                        checked={selectedFilters.countries.includes(country.id)}
                        onChange={(e) => handleFilterChange(e, "countries", country)}
                    />
                ))}
            </div>
            <div className="filter-section">
                <h3>Department</h3>
                {filters.departments.map(department => (
                    <FilterValue
                        key={department.id}
                        label={department.name}
                        name="departments"
                        checked={selectedFilters.departments.includes(department.id)}
                        onChange={(e) => handleFilterChange(e, "departments", department)}
                    />
                ))}
            </div>
            <div className="filter-section">
                <h3>Role</h3>
                {filters.roles.map(role => (
                    <FilterValue
                        key={role.id}
                        label={role.name}
                        name="roles"
                        checked={selectedFilters.roles.includes(role.id)}
                        onChange={(e) => handleFilterChange(e, "roles", role)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeFilters;
