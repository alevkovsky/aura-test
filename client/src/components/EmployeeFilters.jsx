import React from 'react';
import FilterValue from '../reusable/FilterValue';

const EmployeeFilters = ({ filters, selectedFilters, handleFilterChange }) => {
    return (
        <div className="filters">
            <div className="filter-section">
                <h3>Country</h3>
                {filters.countries.map(country => (
                    <FilterValue
                        key={country}
                        label={country}
                        name="countries"
                        checked={selectedFilters.countries.includes(country)}
                        onChange={(e) => handleFilterChange(e, "countries", country)}
                    />
                ))}
            </div>
            <div className="filter-section">
                <h3>Department</h3>
                {filters.departments.map(department => (
                    <FilterValue
                        key={department}
                        label={department}
                        name="departments"
                        checked={selectedFilters.departments.includes(department)}
                        onChange={(e) => handleFilterChange(e, "departments", department)}
                    />
                ))}
            </div>
            <div className="filter-section">
                <h3>Role</h3>
                {filters.roles.map(role => (
                    <FilterValue
                        key={role}
                        label={role}
                        name="roles"
                        checked={selectedFilters.roles.includes(role)}
                        onChange={(e) => handleFilterChange(e, "roles", role)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeFilters;
