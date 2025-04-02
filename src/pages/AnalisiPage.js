import React, { useState, useEffect } from 'react';
import useFilteredData from '../hooks/useFilteredData';
import HeaderComponent from '../components/HeaderComponent';
import PerformanceChartComponent from '../components/PerformanceChartComponent';
import EnvironmentalChartComponent from '../components/EnvironmentalChartComponent';
import ProductionFactorsChartComponent from '../components/ProductionFactorsChartComponent';
import EconomicChartComponent from '../components/EconomicChartComponent';
import WidgetSidebarComponent from '../components/WidgetSidebarComponent';

const AnalisiPage = () => {
    const {
        filteredData,
        filterType,
        setFilterType,
        customFrom,
        setCustomFrom,
        customTo,
        setCustomTo
    } = useFilteredData();

    const availableCrops = filteredData?.at(-1)?.piante?.map(p => p.nome) || [];
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (availableCrops.length > 0 && selectedCrops.length === 0) {
            setSelectedCrops(availableCrops);
        }
    }, [availableCrops]);

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
                filterType={filterType}
                setFilterType={setFilterType}
                customFrom={customFrom}
                setCustomFrom={setCustomFrom}
                customTo={customTo}
                setCustomTo={setCustomTo}
                setSidebarOpen={setSidebarOpen}
                hideExportButton={true}
            />

            <div className="analisiMainContent">
                <div className="chart-row">
                    <div className="half-width">
                        <PerformanceChartComponent data={filteredByCrop}/>
                    </div>
                    <div className="half-width">
                        <EconomicChartComponent data={filteredByCrop} />
                    </div>
                </div>

                <div className="chart-row">
                    <div className="half-width">
                        <EnvironmentalChartComponent data={filteredByCrop} />
                    </div>
                    <div className="half-width">
                        <ProductionFactorsChartComponent data={filteredByCrop} />
                    </div>
                </div>
            </div>

            <WidgetSidebarComponent
                data={filteredByCrop.at(-1)}
                meteo={filteredByCrop.at(-1)?.meteo}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </>
    );
};

export default AnalisiPage;
