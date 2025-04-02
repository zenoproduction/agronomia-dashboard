import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { aggregateWeekly } from '../utils/dataUtils';
import { FaCloudRain } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProductionFactorsChartComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>In attesa dei dati...</p>;

    const displayData = data.length >= 90 ? aggregateWeekly(data) : data;

    const labels = displayData.map(item =>
        new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(item.timestamp))
    );

    const precipitazioni = displayData.map(item => item.precipitazioni);
    const tempoCrescita = displayData.map(item => item.tempoCrescita);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Precipitazioni (mm)',
                data: precipitazioni,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                barThickness: 18,
                order: 2,
                grouped: false
            },
            {
                label: 'Tempo di crescita (gg)',
                data: tempoCrescita,
                backgroundColor: 'rgba(244, 197, 66, 0.6)',
                barThickness: 18,
                order: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        interaction: { mode: 'index', intersect: false },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Valori' }
            }
        }
    };

    return (
        <div className="chart-container">
            <h4 className="subTitle"><FaCloudRain size={20} /> Precipitazioni & Tempo di crescita</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ProductionFactorsChartComponent;
