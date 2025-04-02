import React from 'react';
import WidgetSidebarComponent from './WidgetSidebarComponent';
import PerformanceIndicatorsComponent from './PerformanceIndicatorsComponent';
import ConsumptionKpiComponent from './ConsumptionKpiComponent';
import CostKpiComponent from './CostKpiComponent';
import RevenueKpiComponent from './RevenueKpiComponent';
import PlantedCropsComponent from './PlantedCropsComponent';
import SoilQualityComponent from './SoilQualityComponent';
import SustainabilityComponent from './SustainabilityComponent';
import GenericDataTableComponent from './GenericDataTableComponent';
import {
    FaCloudShowersHeavy,
    FaHourglassHalf,
    FaSeedling,
    FaShoppingBasket,
    FaTemperatureHigh,
    FaTint
} from "react-icons/fa";

const DashboardComponent = ({
                                filteredData,
                                originalData,
                                selectedCrops,
                                meteo
                            }) => {
    const productionColumns = [
        {
            label: 'Data',
            key: 'timestamp',
            format: (val) => {
                const date = new Date(val);
                const giorno = String(date.getDate()).padStart(2, '0');
                const mese = String(date.getMonth() + 1).padStart(2, '0');
                const anno = String(date.getFullYear()).slice(-2);
                return `${giorno}/${mese}/${anno}`;
            },
            align: 'left'
        },
        {
            label: <>
                <FaSeedling style={{ marginRight: '6px' }} />
                Pianta Raccolta
            </>,
            key: 'pianta'
        },
        {
            label: <>
                <FaTemperatureHigh style={{ marginRight: '6px' }} />
                Temperatura (°C)
            </>,
            key: 'temperatura'
        },
        {
            label: <>
                <FaTint style={{ marginRight: '6px' }} />
                Umidità (%)
            </>,
            key: 'umidita'
        },
        {
            label: <>
                <FaCloudShowersHeavy style={{ marginRight: '6px' }} />
                Precipitazioni (mm)
            </>,
            key: 'precipitazioni'
        },
        {
            label: <>
                <FaShoppingBasket style={{ marginRight: '6px' }} />
                Raccolto (kg)
            </>,
            key: 'raccolto'
        },
        {
            label: <>
                <FaHourglassHalf style={{ marginRight: '6px' }} />
                Tempo Crescita (gg)
            </>,
            key: 'tempoCrescita'
        }
    ];

    return (
        <div className="dashboard-layout">
            <WidgetSidebarComponent data={filteredData.at(-1)} meteo={meteo} />

            <div className="dashboardMainContent">
                <div className="blockTitle full twoColumns">
                    <div>Report Meteo</div>
                </div>

                <div className="dashboard-grid">
                    <PerformanceIndicatorsComponent dataList={filteredData} />
                </div>

                <div className="dashboard-grid">
                    <div className="groupOfTree">
                        <h4>Consumi</h4>
                        <ConsumptionKpiComponent data={filteredData} />
                    </div>
                    <div className="groupOfTree">
                        <h4>Costi</h4>
                        <CostKpiComponent data={filteredData} />
                    </div>
                    <div className="groupOfTree">
                        <h4>Ricavi / Vendite</h4>
                        <RevenueKpiComponent data={filteredData} />
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="groupOfTree">
                        <h4>Qualità del suolo</h4>
                        <SoilQualityComponent data={filteredData} />
                    </div>
                    <div className="groupOfTree">
                        <h4>Sostenibilità</h4>
                        <SustainabilityComponent dataList={filteredData} />
                    </div>
                </div>

                <div className="dashboard-grid coltureTable">
                    <div className="full-width">
                        <PlantedCropsComponent
                            data={originalData}
                            selectedCrops={selectedCrops}
                        />
                    </div>
                </div>

                <div className="dashboard-grid productionTable">
                    <div className="full-width">
                        <GenericDataTableComponent
                            data={filteredData}
                            columns={productionColumns}
                            title="Dati di produzione"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
