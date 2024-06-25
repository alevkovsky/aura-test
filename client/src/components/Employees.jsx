import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getEmployees, getFilters } from '../services/restApi';
import './Employees.css';
import EmployeeTable from './EmployeesTable.jsx';
import EmployeeFilters from './EmployeeFilters.jsx';
import { debounce } from '../utils/utils.js';
import Error from '../reusable/Error.jsx';

const Employees = () => {
    const filtersDirty = useRef(false);
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({ roles: [], countries: [], departments: [] });
    const [selectedFilters, setSelectedFilters] = useState({
        roles: [],
        countries: [],
        departments: []
    });
    const [error, setError] = useState(null);

    const fetchEmployees = async (filters = {}) => {
        getEmployees(filters).then(data => setEmployees(data)).catch(e => setError(e.message));
    };

    const fetchFilters = async () => {
        getFilters().then(data => setFilters(data)).catch(e => setError(e.message));
    };

    const applyFilters = useMemo(() => debounce((selectedFilters) => {
        fetchEmployees({
            role: selectedFilters.roles.join(','),
            country: selectedFilters.countries.join(','),
            department: selectedFilters.departments.join(',')
        });
    }, 1000), []);

    useEffect(() => {
        fetchFilters(); // fetch filters
        fetchEmployees(); // initial fetch data
    }, []);

    useEffect(() => {
        if(filtersDirty.current){
            applyFilters(selectedFilters); // filter data
        }
    }, [selectedFilters, applyFilters]);

    const handleFilterChange = (e, name, value) => {
        filtersDirty.current = true;
        const updatedFilters = { ...selectedFilters };
        if (e.target.checked) {
            updatedFilters[name].push(value.id);
        } else {
            updatedFilters[name] = updatedFilters[name].filter(filter => filter !== value.id);
        }
        setSelectedFilters(updatedFilters);
    };

    return (
        <div className="employee-table-container">
            <EmployeeFilters filters={filters} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
            <EmployeeTable employees={employees} />
            <Error error={error} onError={setError} />
        </div>
    );
};

export default Employees;
