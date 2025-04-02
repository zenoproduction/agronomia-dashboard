import React from 'react';

const SustainabilityComponent = ({ dataList }) => {
    const latest = dataList?.at(-1);
    if (!latest) return <p>Nessun dato disponibile sulla sostenibilità.</p>;

    const items = [
        { label: 'Consumo energetico', value: latest.consumoEnergeticoPerKg, unit: 'kWh/kg' },
        { label: 'CO₂ per unità', value: latest.co2PerUnita, unit: 'kg' },
        { label: 'Acqua riciclata', value: `${latest.acquaRiciclataPercentuale}%`, unit: '' }
    ];

    return (
        <div className="kpi-summary">
            {items.map((item, i) => (
                <div key={i} className="kpi-item sustainability">
                    <div className="kpi-unit">{item.unit}</div>
                    <div className="kpi-value">{item.value}</div>
                    <div className="kpi-label">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default SustainabilityComponent;
