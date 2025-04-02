import React from 'react';

const CostKpiComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>Nessun dato disponibile...</p>;

    const sum = (key) => data.reduce((acc, item) => acc + item[key], 0).toFixed(2);

    const items = [
        { label: 'Manutenzione', unit: '€', value: sum('costoManutenzione') },
        { label: 'Attrezzature', unit: '€', value: sum('costoAttrezzature') },
        { label: 'Manodopera', unit: '€', value: sum('costoManodopera') },
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

export default CostKpiComponent;
