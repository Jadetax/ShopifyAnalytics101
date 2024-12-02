// eslint-disable-next-line unicode-bom
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import axios from 'axios';
import '../style/ChartComponent.css'; // Adjust path according to your folder structure


// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const ChartComponent = ({ filter }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/analytics?filter=${filter}`);
                setChartData({
                    labels: response.data.labels,
                    datasets: response.data.datasets,
                });
                setError(null); // Clear previous errors if successful
            } catch (err) {
                console.error("Error fetching data", err);
                setError("Failed to load chart data. Please try again later.");
            }
        };

        fetchData();
    }, [filter]);

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to resize with the container
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Amount',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    callback: (value) => `₱${value.toLocaleString()}`, // Format y-axis values as currency
                },
            },
        },
    };

    // Show an error message if data fetching fails
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Show a loading message until `chartData` is fetched
    if (!chartData) {
        return <div className="loading-message">Loading chart data...</div>;
    }

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
