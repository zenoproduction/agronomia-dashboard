import React from 'react';
import {
    FaTemperatureHigh,
    FaTint,
    FaShower,
    FaWind,
    FaFireAlt,
    FaCloudShowersHeavy,
    FaShoppingBasket,
    FaHourglassHalf
} from 'react-icons/fa';

const KpiSummaryComponent = ({ dataList }) => {
    if (!dataList || dataList.length === 0) return <p>In attesa dei dati...</p>;

    const latest = dataList.at(-1);

    const somma = (arr, key) => arr.reduce((acc, item) => acc + item[key], 0);
    const media = (arr, key) => arr.length ? somma(arr, key) / arr.length : 0;

    const kpiSensori = [
        { label: 'Temperatura', value: `${latest.temperatura} °C`, icon: <FaTemperatureHigh /> },
        { label: 'Umidità', value: `${latest.umidita} %`, icon: <FaTint /> },
        { label: 'Flusso acqua', value: `${latest.flussoAcqua} L/min`, icon: <FaShower /> },
        { label: 'Vento', value: `${latest.vento} km/h`, icon: <FaWind /> },
        { label: 'Fumo', value: latest.fumo ? 'Rilevato' : 'Nessuno', icon: <FaFireAlt /> }
    ];

    const kpiAggregati = [
        { label: 'Precipitazioni totali', value: `${somma(dataList, 'precipitazioni').toFixed(1)} mm`, icon: <FaCloudShowersHeavy /> },
        { label: 'Raccolto totale', value: `${somma(dataList, 'raccolto')} kg`, icon: <FaShoppingBasket /> },
        { label: 'Tempo medio di crescita', value: `${media(dataList, 'tempoCrescita').toFixed(0)} gg`, icon: <FaHourglassHalf /> }
    ];

    return (
        <>
            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>📡 Dati dai sensori</h4>
            <div className="kpi-summary sensor">
                {kpiSensori.map((kpi, i) => (
                    <div key={i} className="kpi-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {kpi.icon}
                            <h4>{kpi.label}</h4>
                        </div>
                        <p>{kpi.value}</p>
                    </div>
                ))}
            </div>

            <h4 style={{ marginTop: '30px', marginBottom: '10px' }}>📊 Dati aggregati ({dataList.length} giorni)</h4>
            <div className="kpi-summary">
                {kpiAggregati.map((kpi, i) => (
                    <div key={i} className="kpi-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {kpi.icon}
                            <h4>{kpi.label}</h4>
                        </div>
                        <p>{kpi.value}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default KpiSummaryComponent;
