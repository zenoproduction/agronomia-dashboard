import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa';

const periodi = [
    { label: 'Ultimi 7 giorni', value: '7' },
    { label: 'Ultimi 30 giorni', value: '30' },
    { label: 'Ultimi 90 giorni', value: '90' },
    { label: 'Personalizzato', value: 'custom' }
];

const DateFilterComponent = ({
                                 filterType,
                                 setFilterType,
                                 customFrom,
                                 setCustomFrom,
                                 customTo,
                                 setCustomTo
                             }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedLabel = periodi.find(p => p.value === filterType)?.label || 'Periodo';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        setFilterType(value);
        setOpen(false);
    };

    return (
        <div className="date-filter-wrapper" ref={dropdownRef}>
            <div className="date-filter-inline">
                <button className="date-filter-button" onClick={() => setOpen(!open)}>
                    <FaCalendarAlt />
                    {selectedLabel}
                    <FaChevronDown />
                </button>

                {filterType === 'custom' && (
                    <div className="custom-date-inline">
                        <input
                            type="date"
                            value={customFrom}
                            onChange={(e) => setCustomFrom(e.target.value)}
                        />
                        <span className="arrow-separator">→</span>
                        <input
                            type="date"
                            value={customTo}
                            onChange={(e) => setCustomTo(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {open && (
                <ul className="date-filter-dropdown">
                    {periodi.map(({ label, value }) => (
                        <li key={value} onClick={() => handleSelect(value)}>
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};

export default DateFilterComponent;
