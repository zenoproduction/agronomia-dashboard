import React, { useRef, useEffect, useState } from 'react';
import ClockComponent from './ClockComponent';
import SensorKpiComponent from './SensorKpiComponent';

const appezzamentiList = [
    'Appezzamento A',
    'Appezzamento B',
    'Appezzamento C',
    'Appezzamento D',
    'Appezzamento E',
    'Appezzamento F',
    'Appezzamento G',
    'Appezzamento H',
    'Appezzamento I',
    'Appezzamento J'
];

const WidgetSidebarComponent = ({ data, meteo, isOpen, onClose }) => {
    const sidebarRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    const [selectedPlot, setSelectedPlot] = useState('Appezzamento A');

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen && !animate) return null;

    return (
        <div className={`widget-sidebar-overlay ${animate ? 'overlay-visible' : 'overlay-hidden'}`}>
            <aside
                className={`widget-sidebar ${animate ? 'slide-in' : 'slide-out'}`}
                ref={sidebarRef}
            >
                <div className="widget-meteo">
                    <ClockComponent meteo={{
                        temperatura: data?.temperatura,
                        nome: data?.meteoCondizione
                    }} />
                </div>

                <div className="plot-select">
                    <label htmlFor="plotSelect">Appezzamento:</label>
                    <select
                        id="plotSelect"
                        value={selectedPlot}
                        onChange={(e) => setSelectedPlot(e.target.value)}
                    >
                        {appezzamentiList.map((plot, i) => (
                            <option key={i} value={plot}>{plot.replace('Appezzamento ', '')}</option>
                        ))}
                    </select>
                </div>

                <div className="widget-sensori">
                    <SensorKpiComponent data={data} selectedPlot={selectedPlot} />
                </div>
            </aside>
        </div>
    );
};

export default WidgetSidebarComponent;
