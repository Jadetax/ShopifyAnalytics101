import React, { useState } from 'react';
import { Card, Select } from '@shopify/polaris';

const Filters = ({ onFilterChange }) => {
    const [selectedValue, setSelectedValue] = useState(''); // Initialize with an empty string

    const options = [
        { label: 'All Time', value: 'all' },
        { label: 'Last 7 Days', value: 'last7' },
        { label: 'Last 30 Days', value: 'last30' },
    ];

    const handleChange = (value) => {
        setSelectedValue(value); // Update the selected value in state
        onFilterChange(value); // Call the callback to handle filter change
    };

    return (
        <Card sectioned>
            <Select
                label="Filter by Time Range"
                options={options}
                onChange={handleChange}
                value={selectedValue} // Bind the selected value to the input field
                placeholder="Select a range"
            />
        </Card>
    );
};

export default Filters;
