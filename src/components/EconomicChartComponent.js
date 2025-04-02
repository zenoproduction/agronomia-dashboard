import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { aggregateWeekly } from '../utils/dataUtils';
import {FaChartLine} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EconomicChartComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>In attesa dei dati...</p>;

    const displayData = data.length >= 90 ? aggregateWeekly(data) : data;

    const labels = displayData.map(item =>
        new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(item.timestamp))
    );

    const consumoAcqua = displayData.map(item => item.consumoAcqua);
    const costoTotale = displayData.map(item =>
        (item.costoManodopera ?? 0) + (item.costoAttrezzature ?? 0) + (item.costoManutenzione ?? 0)
    );
    const ricavoTotale = displayData.map(item =>
        (item.ricavoDettaglio ?? 0) + (item.ricavoGrossisti ?? 0) + (item.ricavoOnline ?? 0)
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Ricavi totali (€)',
                data: ricavoTotale,
                backgroundColor: 'rgba(39, 174, 96, 0.6)',
                barThickness: 18,
                order: 3
            },
            {
                label: 'Costi totali (€)',
                data: costoTotale,
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
                barThickness: 18,
                order: 2,
                grouped: false
            },
            {
                label: 'Consumi acqua (L)',
                data: consumoAcqua,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                barThickness: 18,
                order: 1,
                grouped: false
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
            <h4 className="subTitle"><FaChartLine size={20} /> Andamento Consumi, Costi e Ricavi</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default EconomicChartComponent;
