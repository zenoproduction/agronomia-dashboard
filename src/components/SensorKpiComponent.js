import React from 'react';
import { FaMicrochip } from 'react-icons/fa';

const SensorKpiComponent = ({ data, selectedPlot }) => {
    if (!data || !data.appezzamenti) return <p>In attesa dei dati dai sensori...</p>;

    const plotData = data.appezzamenti.find(p => p.nome === selectedPlot);

    if (!plotData) return <p>Nessun dato disponibile per {selectedPlot}</p>;

    const kpiSensori = [
        { label: 'Sensore Temperatura', value: `${plotData.temperatura} °C` },
        { label: 'Sensore Umidità', value: `${plotData.umidita} %` },
        { label: 'Sensore Flusso acqua', value: `${plotData.flussoAcqua} L/min` },
        { label: 'Sensore Vento', value: `${plotData.vento} km/h` },
        { label: 'pH del Terreno', value: `${plotData.phTerreno}` }
    ];

    return (
        <div className="kpi-summary">
            {kpiSensori.map((kpi, i) => (
                <div key={i} className="kpi-item sensor">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'start' }}>
                        <FaMicrochip />
                        <h4>{kpi.label}</h4>
                    </div>
                    <p>{kpi.value}</p>
                </div>
            ))}
        </div>
    );
};

export default SensorKpiComponent;
