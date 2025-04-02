import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { aggregateWeekly } from '../utils/dataUtils';
import { FaThermometerHalf } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EnvironmentalChartComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>In attesa dei dati...</p>;

    const displayData = data.length >= 90 ? aggregateWeekly(data) : data;

    const labels = displayData.map(item =>
        new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(item.timestamp))
    );

    const temperatura = displayData.map(item => item.temperatura);
    const umidita = displayData.map(item => item.umidita);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Umidità (%)',
                data: umidita,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                barThickness: 18,
                order: 2,
                grouped: false
            },
            {
                label: 'Temperatura (°C)',
                data: temperatura,
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
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
            <h4 className="subTitle"><FaThermometerHalf size={20} /> Temperatura & Umidità</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default EnvironmentalChartComponent;
