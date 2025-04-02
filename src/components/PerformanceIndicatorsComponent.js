import React from 'react';
import { FaTemperatureLow, FaTint } from 'react-icons/fa';
import MiniBarChart from './MiniBarChart';
import { FaCloudRain } from 'react-icons/fa';

const PerformanceIndicatorsComponent = ({ dataList }) => {
    if (!dataList || dataList.length === 0) return <p>In attesa dei dati...</p>;

    const sum = (arr, key) => arr.reduce((acc, val) => acc + val[key], 0);
    const avg = (arr, key) => sum(arr, key) / arr.length;
    const stdDev = (arr, key) => {
        const mean = avg(arr, key);
        const variance = arr.reduce((acc, val) => acc + Math.pow(val[key] - mean, 2), 0) / arr.length;
        return Math.sqrt(variance);
    };

    const stdTemperatura = stdDev(dataList, 'temperatura');
    const stdUmidita = stdDev(dataList, 'umidita');

    const getLevelReverse = (val, medio, buono) => val <= buono ? 'buono' : val <= medio ? 'medio' : 'basso';

    const indicators = [
        {
            label: 'Precipitazioni giornaliere',
            icon: <FaCloudRain size={20} />,
            value: `${sum(dataList, 'precipitazioni').toFixed(1)} mm`,
            level: 'buono',
            sparkline: dataList.map(item => item.precipitazioni),
            color: '#3f8efc'
        },
        {
            label: 'Stabilità temperatura',
            icon: <FaTemperatureLow size={20} />,
            value: `${stdTemperatura.toFixed(1)} °C`,
            level: getLevelReverse(stdTemperatura, 4, 2),
            sparkline: dataList.map(item => item.temperatura),
            color: '#f39c12'
        },
        {
            label: 'Stabilità umidità',
            icon: <FaTint size={20} />,
            value: `${stdUmidita.toFixed(1)} %`,
            level: getLevelReverse(stdUmidita, 10, 5),
            sparkline: dataList.map(item => item.umidita),
            color: '#3498db'
        }
    ];

    return (
        <div className="indicators-row">
            {indicators.map((ind, idx) => (
                <div key={idx} className={`indicator-box ${ind.level}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        {ind.icon}
                        <h4 style={{ margin: 0 }}>{ind.label}</h4>
                    </div>
                    {ind.sparkline && (
                        <>
                            <p>{ind.value}</p>
                            <MiniBarChart data={ind.sparkline} color={ind.color} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PerformanceIndicatorsComponent;
