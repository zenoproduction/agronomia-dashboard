import { useState, useEffect } from 'react';
import { generateHistoricalSimulatedData } from '../services/simulationService';

export default function useFilteredData() {
    const [allData] = useState(generateHistoricalSimulatedData(180));
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('30');
    const [customFrom, setCustomFrom] = useState('');
    const [customTo, setCustomTo] = useState('');

    useEffect(() => {
        if (!allData || allData.length === 0) return;

        let filtered = [];

        const now = new Date();
        const fromDate = new Date(now);
        fromDate.setDate(now.getDate() - Number(filterType));

        if (filterType === 'custom') {
            if (customFrom && customTo) {
                filtered = allData.filter(d => {
                    const date = new Date(d.timestamp);
                    return date >= new Date(customFrom) && date <= new Date(customTo);
                });
            }
        } else {
            filtered = allData.filter(d => {
                const date = new Date(d.timestamp);
                return date >= fromDate && date <= now;
            });
        }

        setFilteredData(filtered);
    }, [allData, filterType, customFrom, customTo]);


    return { allData, filteredData, filterType, setFilterType, customFrom, setCustomFrom, customTo, setCustomTo };
}
