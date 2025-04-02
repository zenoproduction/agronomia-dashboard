import React, { useState, useEffect } from 'react';
import useFilteredData from '../hooks/useFilteredData';
import HeaderComponent from '../components/HeaderComponent';
import DashboardComponent from '../components/DashboardComponent';
import WidgetSidebarComponent from '../components/WidgetSidebarComponent';

const DashboardPage = () => {
    const {
        allData, filteredData, filterType,
        setFilterType, customFrom,
        setCustomFrom, customTo, setCustomTo
    } = useFilteredData();

    const availableCrops = filteredData?.at(-1)?.piante?.map(p => p.nome) || [];

    const [selectedCrops, setSelectedCrops] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (availableCrops.length > 0 && selectedCrops.length === 0) {
            setSelectedCrops(availableCrops);
        }
    }, [availableCrops, selectedCrops.length]);

    const filteredByCrop = selectedCrops.length === 0
        ? []
        : filteredData.filter(d => selectedCrops.includes(d.pianta));

    return (
        <>
            <HeaderComponent
                filteredData={filteredData}
                availableCrops={availableCrops}
                selectedCrops={selectedCrops}
                setSelectedCrops={setSelectedCrops}
                setSidebarOpen={setSidebarOpen}
                filterType={filterType}
                setFilterType={setFilterType}
                customFrom={customFrom}
                setCustomFrom={setCustomFrom}
                customTo={customTo}
                setCustomTo={setCustomTo}
            />
            <DashboardComponent
                filteredData={filteredByCrop}
                originalData={allData}
                selectedCrops={selectedCrops}
                filterType={filterType}
                setFilterType={setFilterType}
                customFrom={customFrom}
                setCustomFrom={setCustomFrom}
                customTo={customTo}
                setCustomTo={setCustomTo}
                meteo={filteredByCrop.at(-1)?.meteo}
            />
            <WidgetSidebarComponent
                data={filteredByCrop.at(-1)}
                meteo={filteredByCrop.at(-1)?.meteo}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </>
    );
};

export default DashboardPage;
