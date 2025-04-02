import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function prepareExportData(filteredData, cropFilter, selectedOptions) {
    const latest = filteredData.at(-1);
    const cropList = latest?.piante || [];
    const cropToExport = cropFilter === 'tutte' ? null : cropFilter;

    const zip = new JSZip();
    const files = [];

    if (selectedOptions.includes('colture_piantate')) {
        const data = (cropToExport
                ? cropList.filter(c => c.nome === cropToExport)
                : cropList
        ).map(crop => {
            const seminaDate = new Date(latest.timestamp);
            const raccoltaDate = new Date(seminaDate);
            raccoltaDate.setDate(seminaDate.getDate() + crop.tempoRaccolto);

            return {
                'nome': crop.nome,
                'quantità (pz)': crop.quantità,
                'seminato': seminaDate.toISOString().split('T')[0],
                'raccolto stimato': raccoltaDate.toISOString().split('T')[0],
                'ricavo (€)': crop.ricavo,
                'costo (€)': crop.costo
            };
        });

        files.push({
            filename: `esportazione_dati_agronomia_colture_piantate.csv`,
            data,
            headers: ['nome', 'quantità (pz)', 'seminato', 'raccolto stimato', 'ricavo (€)', 'costo (€)']
        });
    }


    if (selectedOptions.includes('qualita_suolo')) {
        files.push({
            filename: `esportazione_dati_agronomia_qualita_del_suolo.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'pH suolo': item.phSuolo,
                'N (mg/kg)': item.nutrienteN,
                'P (mg/kg)': item.nutrienteP,
                'K (mg/kg)': item.nutrienteK,
                'Umidità suolo (%)': item.umiditaSuolo
            })),
            headers: ['data', 'pH suolo', 'N (mg/kg)', 'P (mg/kg)', 'K (mg/kg)', 'Umidità suolo (%)']
        });
    }

    if (selectedOptions.includes('sostenibilita')) {
        files.push({
            filename: `esportazione_dati_agronomia_sostenibilita.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'Energia per kg (kWh/kg)': item.consumoEnergeticoPerKg,
                'CO2 (kg/unità)': item.co2PerUnita,
                'Acqua riciclata (%)': item.acquaRiciclataPercentuale
            })),
            headers: ['data', 'Energia per kg (kWh/kg)', 'CO2 (kg/unità)', 'Acqua riciclata (%)']
        });
    }

    if (selectedOptions.includes('consumi')) {
        files.push({
            filename: `esportazione_dati_agronomia_consumi.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'Acqua (L)': item.consumoAcqua,
                'Elettricità (kWh)': item.consumoElettricita,
                'Fertilizzante (kg)': item.consumoFertilizzante,
                'Pesticida (L)': item.consumoPesticida
            })),
            headers: ['data', 'Acqua (L)', 'Elettricità (kWh)', 'Fertilizzante (kg)', 'Pesticida (L)']
        });
    }

    if (selectedOptions.includes('costi')) {
        files.push({
            filename: `esportazione_dati_agronomia_costi.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'Manutenzione (€)': item.costoManutenzione,
                'Attrezzature (€)': item.costoAttrezzature,
                'Manodopera (€)': item.costoManodopera
            })),
            headers: ['data', 'Manutenzione (€)', 'Attrezzature (€)', 'Manodopera (€)']
        });
    }

    if (selectedOptions.includes('ricavi')) {
        files.push({
            filename: `esportazione_dati_agronomia_ricavi.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'Vendita al dettaglio (€)': item.ricavoDettaglio,
                'Grossisti (€)': item.ricavoGrossisti,
                'Vendita online (€)': item.ricavoOnline
            })),
            headers: ['data', 'Vendita al dettaglio (€)', 'Grossisti (€)', 'Vendita online (€)']
        });
    }

    if (selectedOptions.includes('meteo')) {
        files.push({
            filename: `esportazione_dati_agronomia_meteo.csv`,
            data: filteredData.map(item => ({
                data: item.timestamp.split('T')[0],
                'Condizione': item.meteoCondizione,
                'Temperatura (°C)': item.temperatura,
                'Umidità (%)': item.umidita,
                'Precipitazioni (mm)': item.precipitazioni,
                'Vento (km/h)': item.vento
            })),
            headers: ['data', 'Condizione', 'Temperatura (°C)', 'Umidità (%)', 'Precipitazioni (mm)', 'Vento (km/h)']
        });
    }

    if (selectedOptions.includes('produzione')) {
        const data = cropToExport
            ? filteredData.filter(d => d.pianta === cropToExport)
            : filteredData;

        files.push({
            filename: `esportazione_dati_agronomia_dati_produzione.csv`,
            data: data.map(d => ({
                data: d.timestamp.split('T')[0],
                'Pianta': d.pianta,
                'Temperatura (°C)': d.temperatura,
                'Umidità (%)': d.umidita,
                'Precipitazioni (mm)': d.precipitazioni,
                'Raccolto (kg)': d.raccolto,
                'Tempo di crescita (gg)': d.tempoCrescita
            })),
            headers: ['data', 'Pianta', 'Temperatura (°C)', 'Umidità (%)', 'Precipitazioni (mm)', 'Raccolto (kg)', 'Tempo di crescita (gg)']
        });
    }

    files.forEach(({ filename, data, headers }) => {
        const csvHeaders = headers.join(',');
        const csvRows = data.map(row =>
            headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(',')
        );
        const csvContent = [csvHeaders, ...csvRows].join('\n');
        zip.file(filename, csvContent);
    });

    zip.generateAsync({ type: 'blob' }).then(blob => {
        saveAs(blob, 'esportazione_dati_agronomia.zip');
    });
}
