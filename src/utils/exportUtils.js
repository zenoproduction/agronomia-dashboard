import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const giorno = String(date.getDate()).padStart(2, '0');
    const mese = String(date.getMonth() + 1).padStart(2, '0');
    const anno = String(date.getFullYear()).slice(-2);
    return `${giorno}/${mese}/${anno}`;
}

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
                nome: crop.nome,
                quantità: crop.quantità,
                'seminato': formatDate(seminaDate),
                'raccolto stimato': formatDate(raccoltaDate),
                'ricavo (€)': crop.ricavo,
                'costo (€)': crop.costo
            };
        });

        files.push({
            filename: `esportazione_dati_agronomia_colture_piantate.csv`,
            data,
            headers: ['nome', 'quantità', 'seminato', 'raccolto stimato', 'ricavo (€)', 'costo (€)']
        });
    }

    if (selectedOptions.includes('qualita_suolo')) {
        files.push({
            filename: `esportazione_dati_agronomia_qualita_del_suolo.csv`,
            data: [{
                'pH suolo': latest.phSuolo,
                'N (mg/kg)': latest.nutrienteN,
                'P (mg/kg)': latest.nutrienteP,
                'K (mg/kg)': latest.nutrienteK,
                'Umidità suolo (%)': latest.umiditaSuolo
            }],
            headers: ['pH suolo', 'N (mg/kg)', 'P (mg/kg)', 'K (mg/kg)', 'Umidità suolo (%)']
        });
    }

    if (selectedOptions.includes('sostenibilita')) {
        files.push({
            filename: `esportazione_dati_agronomia_sostenibilita.csv`,
            data: [{
                'Consumo energetico per kg (kWh/kg)': latest.consumoEnergeticoPerKg,
                'CO2 per unità (kg)': latest.co2PerUnita,
                'Acqua riciclata (%)': latest.acquaRiciclataPercentuale
            }],
            headers: ['Consumo energetico per kg (kWh/kg)', 'CO2 per unità (kg)', 'Acqua riciclata (%)']
        });
    }

    if (selectedOptions.includes('consumi')) {
        files.push({
            filename: `esportazione_dati_agronomia_consumi.csv`,
            data: [{
                'Consumo acqua (L)': latest.consumoAcqua,
                'Consumo elettricità (kWh)': latest.consumoElettricita,
                'Consumo fertilizzante (kg)': latest.consumoFertilizzante,
                'Consumo pesticida (kg)': latest.consumoPesticida
            }],
            headers: ['Consumo acqua (L)', 'Consumo elettricità (kWh)', 'Consumo fertilizzante (kg)', 'Consumo pesticida (kg)']
        });
    }

    if (selectedOptions.includes('costi')) {
        files.push({
            filename: `esportazione_dati_agronomia_costi.csv`,
            data: [{
                'Manutenzione (€)': latest.costoManutenzione,
                'Attrezzature (€)': latest.costoAttrezzature,
                'Manodopera (€)': latest.costoManodopera
            }],
            headers: ['Manutenzione (€)', 'Attrezzature (€)', 'Manodopera (€)']
        });
    }

    if (selectedOptions.includes('ricavi')) {
        files.push({
            filename: `esportazione_dati_agronomia_ricavi.csv`,
            data: [{
                'Vendite al dettaglio (€)': latest.ricavoDettaglio,
                'Vendite ai grossisti (€)': latest.ricavoGrossisti,
                'Vendite online (€)': latest.ricavoOnline
            }],
            headers: ['Vendite al dettaglio (€)', 'Vendite ai grossisti (€)', 'Vendite online (€)']
        });
    }

    if (selectedOptions.includes('meteo')) {
        files.push({
            filename: `esportazione_dati_agronomia_meteo.csv`,
            data: [{
                'Condizione': latest.meteoCondizione,
                'Temperatura (°C)': latest.temperatura,
                'Umidità (%)': latest.umidita,
                'Precipitazioni (mm)': latest.precipitazioni,
                'Vento (km/h)': latest.vento
            }],
            headers: ['Condizione', 'Temperatura (°C)', 'Umidità (%)', 'Precipitazioni (mm)', 'Vento (km/h)']
        });
    }

    if (selectedOptions.includes('produzione')) {
        const data = (cropToExport
                ? filteredData.filter(d => d.pianta === cropToExport)
                : filteredData
        ).map(item => ({
            'Data': formatDate(item.timestamp),
            'Pianta': item.pianta,
            'Temperatura (°C)': item.temperatura,
            'Umidità (%)': item.umidita,
            'Precipitazioni (mm)': item.precipitazioni,
            'Raccolto (kg)': item.raccolto,
            'Tempo crescita (gg)': item.tempoCrescita
        }));

        files.push({
            filename: `esportazione_dati_agronomia_dati_produzione.csv`,
            data,
            headers: ['Data', 'Pianta', 'Temperatura (°C)', 'Umidità (%)', 'Precipitazioni (mm)', 'Raccolto (kg)', 'Tempo crescita (gg)']
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
