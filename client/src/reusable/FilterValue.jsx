import React from 'react';

const FilterValue = ({ label, name, checked, onChange }) => {
    return (
        <div className="filter-checkbox">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                id={label}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

export default FilterValue;
