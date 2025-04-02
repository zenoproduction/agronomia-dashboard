import React, { useEffect, useState } from 'react';
import { FaSun, FaCloudSun, FaCloud, FaCloudRain, FaBolt, FaSnowflake, FaTemperatureHigh } from 'react-icons/fa';

const meteoIconMap = {
    'Soleggiato': <FaSun />,
    'Parz. Nuvoloso': <FaCloudSun />,
    'Nuvoloso': <FaCloud />,
    'Pioggia': <FaCloudRain />,
    'Temporale': <FaBolt />,
    'Neve': <FaSnowflake />
};

const ClockComponent = ({ meteo }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const day = currentTime.getDate().toString().padStart(2, '0');
    const month = currentTime.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
    const timeString = currentTime.toLocaleTimeString();

    const temperatura = meteo?.temperatura || 24;
    const meteoNome = meteo?.nome || 'Soleggiato';
    const meteoIcona = meteoIconMap[meteoNome] || <FaSun />;

    return (
        <div className="clock-box-split">
            <div className="clock-left">
                <div className="day">{day}</div>
                <div className="month">{month}</div>
            </div>
            <div className="clock-right">
                <div className="temp">
                    {meteoIcona} {temperatura}°C
                </div>
                <div className="condizione">
                    {meteoNome}
                </div>
            </div>
        </div>
    );
};

export default ClockComponent;
