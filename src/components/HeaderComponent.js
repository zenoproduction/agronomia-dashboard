import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileExport, FaChevronDown } from 'react-icons/fa';
import { MdWidgets } from 'react-icons/md';
import ExportModalComponent from './ExportModalComponent';
import DateFilterComponent from './DateFilterComponent';
import { prepareExportData } from '../utils/exportUtils';

const HeaderComponent = ({
                             availableCrops = [],
                             filteredData = [],
                             selectedCrops,
                             setSelectedCrops,
                             setSidebarOpen,
                             filterType,
                             setFilterType,
                             customFrom,
                             setCustomFrom,
                             customTo,
                             setCustomTo,
                             hideExportButton = false,
                             hideWidgetButton = false
                         }) => {
    const location = useLocation();
    const [isExportModalOpen, setExportModalOpen] = useState(false);
    const [showCropMenu, setShowCropMenu] = useState(false);
    const cropMenuRef = useRef(null);

    const getPageTitle = () => {
        if (location.pathname === '/') return 'Dashboard';
        if (location.pathname === '/analisi') return 'Analisi';
        return 'Agronomia';
    };

    const handleExport = (selectedCrop, selectedOptions) => {
        prepareExportData(filteredData, selectedCrop, selectedOptions);
    };

    const toggleCropSelection = (crop) => {
        if (selectedCrops.includes(crop)) {
            setSelectedCrops(selectedCrops.filter(c => c !== crop));
        } else {
            setSelectedCrops([...selectedCrops, crop]);
        }
    };

    const handleSelectAll = (checked) => {
        setSelectedCrops(checked ? availableCrops : []);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cropMenuRef.current && !cropMenuRef.current.contains(event.target)) {
                setShowCropMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-top">
                <div className="header-left">
                    <div className="logo-title">
                        <img src="leaf-icon.png" alt="Agronomia" className="logo"/>
                        <h1>Agronomia</h1>
                    </div>
                </div>

                <nav className="nav-menu">
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <FaHome style={{ marginRight: '6px' }} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/analisi" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <FaChartBar style={{ marginRight: '6px' }} />
                        Analisi
                    </NavLink>
                </nav>

                <div className="header-widget-toggle">
                    <button
                        className="button-icon"
                        onClick={() => setSidebarOpen(true)}
                        title="Mostra sidebar sensori"
                    >
                        <MdWidgets />
                    </button>
                </div>
            </div>

            <div className="header-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>{getPageTitle()}</span>

                    <div
                        className="buttonCont-header"
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                        <DateFilterComponent
                            filterType={filterType}
                            setFilterType={setFilterType}
                            customFrom={customFrom}
                            setCustomFrom={setCustomFrom}
                            customTo={customTo}
                            setCustomTo={setCustomTo}
                        />

                        <div className="crop-menu" ref={cropMenuRef}>
                            <button onClick={() => setShowCropMenu(!showCropMenu)} className="button-green">
                                Colture <FaChevronDown style={{ marginLeft: 6 }} />
                            </button>
                            {showCropMenu && (
                                <div className="crop-dropdown">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedCrops.length === availableCrops.length}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                        Seleziona tutte
                                    </label>
                                    {availableCrops.map((crop, idx) => (
                                        <label key={idx}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCrops.includes(crop)}
                                                onChange={() => toggleCropSelection(crop)}
                                            />
                                            {crop}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!hideExportButton && (
                        <button
                            className="button-green"
                            onClick={() => setExportModalOpen(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            <FaFileExport />
                            Esporta
                        </button>
                        )}
                    </div>
                </div>
            </div>

            <ExportModalComponent
                isOpen={isExportModalOpen}
                onClose={() => setExportModalOpen(false)}
                onExport={handleExport}
                availableCrops={availableCrops}
            />
        </header>
    );
};

export default HeaderComponent;
