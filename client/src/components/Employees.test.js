import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Employees from './Employees';
import { getEmployees, getFilters } from '../services/restApi';
import { act } from 'react';

// Mock the restApi module
jest.mock('../services/restApi', () => ({
    getEmployees: jest.fn(),
    getFilters: jest.fn(),
}));

jest.useFakeTimers();

describe('Employees', () => {
    const mockEmployees = [
        { id: 1, first_name: 'John', last_name: 'Doe', country: 'United States', department: 'IT', role: 'Manager' },
        { id: 2, first_name: 'Jane', last_name: 'Smith', country: 'Germany', department: 'Engineering', role: 'Analyst' },
    ];

    const mockFilters = {
        "roles": [
            {
                "id": 1,
                "name": "Analyst"
            },
            {
                "id": 2,
                "name": "Manager"
            }
        ],
        "countries": [
            {
                "id": 1,
                "name": "United States"
            },
            {
                "id": 2,
                "name": "Germany"
            }
        ],
        "departments": [
            {
                "id": 3,
                "name": "IT"
            },
            {
                "id": 4,
                "name": "Engineering"
            }
        ]
    };

    beforeEach(() => {
        getEmployees.mockResolvedValue(mockEmployees);
        getFilters.mockResolvedValue(mockFilters);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Employees component and fetches initial data', async () => {
        await act(async () => {
            render(<Employees />);
        });

        expect(getFilters).toHaveBeenCalledTimes(1);
        expect(getEmployees).toHaveBeenCalledTimes(1);


        // Check if the filters and employees table are rendered
        const filters = screen.getByTestId("employee-filters");
        expect(filters).toHaveTextContent('Country');
        expect(filters).toHaveTextContent('United States');
        expect(filters).toHaveTextContent('Department');
        expect(filters).toHaveTextContent('IT');
        expect(filters).toHaveTextContent('Role');
        expect(filters).toHaveTextContent('IT');


        // Wait for the employees to be fetched and displayed
        const table = screen.getByTestId('employee-table');
        expect(table).toHaveTextContent('1');
        expect(table).toHaveTextContent('2');
        const rows = within(table).getAllByTestId('employee-row');
        expect(rows).toHaveLength(2);
    });

    test('applies filters correctly', async () => {
        await act(async () => {
            render(<Employees />);
        });
        expect(getFilters).toHaveBeenCalledTimes(1);
        expect(getEmployees).toHaveBeenCalledTimes(1);

        expect(getEmployees).toHaveBeenCalledWith({});

        // Apply country filter
        const countryCheckbox = screen.getByLabelText('United States');
        fireEvent.click(countryCheckbox);

        jest.advanceTimersByTime(1000);

        // Wait for employees to be fetched with the applied filter
        await waitFor(() => expect(getEmployees).toHaveBeenCalledWith({
            role: '',
            country: '1',
            department: ''
        }));
    });

    test('shows error message when fetch fails', async () => {
        getEmployees.mockRejectedValueOnce(new Error('Failed to fetch employees'));
        render(<Employees />);

        // Wait for the error message to be displayed
        await waitFor(() => expect(screen.getByText(/Failed to fetch employees/i)).toBeInTheDocument());
    });
});
