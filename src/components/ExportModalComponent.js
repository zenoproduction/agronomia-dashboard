import React, { useState } from 'react';

const exportOptions = [
    { label: 'Colture piantate', key: 'colture_piantate' },
    { label: 'Qualità del suolo', key: 'qualita_suolo' },
    { label: 'Sostenibilità', key: 'sostenibilita' },
    { label: 'Consumi', key: 'consumi' },
    { label: 'Costi', key: 'costi' },
    { label: 'Ricavi / Vendite', key: 'ricavi' },
    { label: 'Report meteo', key: 'meteo' },
    { label: 'Dati di produzione', key: 'produzione' }
];

const ExportModalComponent = ({ isOpen, onClose, onExport, availableCrops }) => {

    const [selectedCrop, setSelectedCrop] = useState('tutte');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckboxChange = (key) => {
        setSelectedOptions(prev =>
            prev.includes(key)
                ? prev.filter(item => item !== key)
                : [...prev, key]
        );
    };

    const handleExport = () => {
        if (selectedOptions.length === 0) {
            setErrorMessage('Seleziona almeno una opzione da esportare.');
            return;
        }
        onExport(selectedCrop, selectedOptions);
        onClose();
        setSelectedOptions([]);
        setSelectedCrop('tutte');
        setErrorMessage('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-content">
                    <h3>Agronomia - Esportazione Dati </h3>

                    <label className="exportOptionTitle">
                        Coltura:
                        <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
                            <option value="tutte">Tutte</option>

                            {Array.isArray(availableCrops) && availableCrops.length > 0 && availableCrops.map((crop, index) => (
                                <option key={index} value={crop}>{crop}</option>
                            ))}
                        </select>
                    </label>

                    <label className="exportOptionTitle">
                        Dati da esportare:
                    </label>

                    <div className="export-options">
                        {exportOptions.map(opt => (
                            <label key={opt.key}>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(opt.key)}
                                    onChange={() => handleCheckboxChange(opt.key)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <div className="modal-actions">
                        <button onClick={handleExport} className="button-green">Esporta</button>
                        <button onClick={onClose}>Annulla</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportModalComponent;
