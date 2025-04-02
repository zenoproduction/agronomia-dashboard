import React from 'react';
import GenericDataTableComponent from './GenericDataTableComponent';

const PlantedCropsComponent = ({ data, selectedCrops = [] }) => {
    const lastWithCrops = [...data].reverse().find(entry => Array.isArray(entry.piante) && entry.piante.length > 0);
    const allCrops = lastWithCrops?.piante || [];
    const baseDate = new Date(lastWithCrops?.timestamp);

    const filteredCrops = selectedCrops.length === 0
        ? []
        : allCrops
            .filter(crop => selectedCrops.includes(crop.nome))
            .map(crop => {
                const semina = baseDate;
                const raccolta = new Date(semina);
                raccolta.setDate(raccolta.getDate() + crop.tempoRaccolto);

                return {
                    ...crop,
                    seminato: semina.toLocaleDateString('it-IT'),
                    raccoltoStimato: raccolta.toLocaleDateString('it-IT'),
                };
            });

    const columns = [
        { label: 'Nome Pianta', key: 'nome', align: 'left' },
        { label: 'Quantità', key: 'quantità' },
        { label: 'Seminato', key: 'seminato' },
        { label: 'Raccolto stimato', key: 'raccoltoStimato' },
        { label: 'Ricavo (€)', key: 'ricavo' },
        { label: 'Costo (€)', key: 'costo' }
    ];

    return (
        <GenericDataTableComponent
            data={filteredCrops}
            columns={columns}
            title="Colture Piantate"
        />
    );
};

export default PlantedCropsComponent;
