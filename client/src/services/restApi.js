import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getEmployees = async (filters) => {
    let query = `${API_URL}/employees`;
    if (filters) {
        const params = new URLSearchParams(filters).toString();
        query += `?${params}`;
    }
    const response = await axios.get(query);
    return response.data;
};

export const getFilters = async () => {
    const response = await axios.get(`${API_URL}/employees/filters`);
    return response.data;
};
