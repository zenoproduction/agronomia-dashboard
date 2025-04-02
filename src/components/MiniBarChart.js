import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const MiniBarChart = ({ data, color = '#4caf50' }) => {
    const chartData = {
        labels: data.map((_, i) => i + 1),
        datasets: [{
            data,
            backgroundColor: color,
            barThickness: 6,
            borderRadius: 0,
            categoryPercentage: 1.0,
            barPercentage: 0.8
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 0
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false }
            },
            y: {
                display: false,
                grid: { display: false }
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '50px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default MiniBarChart;
