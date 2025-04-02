import React from 'react';

const RevenueKpiComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>Nessun dato disponibile...</p>;

    const sum = (key) => data.reduce((acc, item) => acc + item[key], 0).toFixed(2);

    const items = [
        { label: 'Al dettaglio', unit: '€', value: sum('ricavoDettaglio') },
        { label: 'Ai grossisti', unit: '€', value: sum('ricavoGrossisti') },
        { label: 'Online', unit: '€', value: sum('ricavoOnline') },
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

export default RevenueKpiComponent;
