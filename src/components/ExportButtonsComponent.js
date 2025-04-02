import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const ExportButtonsComponent = ({ data }) => {
    if (!data || data.length === 0) return null;

    const handleExportJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        });
        saveAs(blob, 'dati-simulati.json');
    };

    const handleExportCSV = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'dati-simulati.csv');
    };

    return (
        <div className="export-buttons">
            <button className="button-green" onClick={handleExportCSV}>Esporta CSV</button>
            <button className="button-green" onClick={handleExportJSON}>Esporta JSON</button>
        </div>
    );
};

export default ExportButtonsComponent;
