import React from 'react';

const ConsumptionKpiComponent = ({ data }) => {
    if (!data) return <p>In attesa dei dati sui consumi...</p>;

    const sum = (key) => data.reduce((acc, item) => acc + item[key], 0).toFixed(1);

    const items = [
        { label: 'Acqua', unit: 'Litri', value: sum('consumoAcqua') },
        { label: 'Elettricità', unit: 'kWh', value: sum('consumoElettricita') },
        { label: 'Fertilizzante', unit: 'Kg', value: sum('consumoFertilizzante') },
    ];

    return (
        <div className="kpi-summary">
            {items.map((item, i) => (
                <div key={i} className="kpi-item">
                    <div className="kpi-unit">{item.unit}</div>
                    <p className="kpi-value">{item.value}</p>
                    <h4 className="kpi-label">{item.label}</h4>
                </div>
            ))}
        </div>
    );
};

export default ConsumptionKpiComponent;
