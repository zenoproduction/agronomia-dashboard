import React from 'react';

const SoilQualityComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>Nessun dato disponibile sulla qualità del suolo.</p>;

    const latest = data.at(-1);

    const items = [
        { label: 'pH del Suolo', value: latest.phSuolo, unit: '' },
        { label: 'Azoto (N)', value: latest.nutrienteN, unit: 'mg/kg' },
        { label: 'Fosforo (P)', value: latest.nutrienteP, unit: 'mg/kg' },
        { label: 'Potassio (K)', value: latest.nutrienteK, unit: 'mg/kg' },
        { label: 'Umidità del suolo', value: latest.umiditaSuolo, unit: '%' },
    ];

    return (
        <div className="kpi-summary soilCont">
            {items.map((item, i) => (
                <div key={i} className="kpi-item soil">
                    <div className="kpi-unit">{item.unit}</div>
                    <div className="kpi-value">{item.value}</div>
                    <div className="kpi-label">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default SoilQualityComponent;
