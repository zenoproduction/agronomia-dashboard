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
                ...crop,
                seminato: seminaDate.toISOString().split('T')[0],
                raccoltoStimato: raccoltaDate.toISOString().split('T')[0]
            };
        });

        files.push({
            filename: `esportazione_dati_agronomia_colture_piantate.csv`,
            data,
            headers: ['nome', 'quantità', 'seminato', 'raccoltoStimato', 'ricavo', 'costo']
        });
    }


    if (selectedOptions.includes('qualita_suolo')) {
        files.push({
            filename: `esportazione_dati_agronomia_qualita_del_suolo.csv`,
            data: [latest],
            headers: ['phSuolo', 'nutrienteN', 'nutrienteP', 'nutrienteK', 'umiditaSuolo']
        });
    }

    if (selectedOptions.includes('sostenibilita')) {
        files.push({
            filename: `esportazione_dati_agronomia_sostenibilita.csv`,
            data: [latest],
            headers: ['consumoEnergeticoPerKg', 'co2PerUnita', 'acquaRiciclataPercentuale']
        });
    }

    if (selectedOptions.includes('consumi')) {
        files.push({
            filename: `esportazione_dati_agronomia_consumi.csv`,
            data: [latest],
            headers: ['consumoAcqua', 'consumoElettricita', 'consumoFertilizzante', 'consumoPesticida']
        });
    }

    if (selectedOptions.includes('costi')) {
        files.push({
            filename: `esportazione_dati_agronomia_costi.csv`,
            data: [latest],
            headers: ['costoManutenzione', 'costoAttrezzature', 'costoManodopera']
        });
    }

    if (selectedOptions.includes('ricavi')) {
        files.push({
            filename: `esportazione_dati_agronomia_ricavi.csv`,
            data: [latest],
            headers: ['ricavoDettaglio', 'ricavoGrossisti', 'ricavoOnline']
        });
    }

    if (selectedOptions.includes('meteo')) {
        files.push({
            filename: `esportazione_dati_agronomia_meteo.csv`,
            data: [latest],
            headers: ['meteoCondizione', 'temperatura', 'umidita', 'precipitazioni', 'vento']
        });
    }

    if (selectedOptions.includes('produzione')) {
        const data = cropToExport
            ? filteredData.filter(d => d.pianta === cropToExport)
            : filteredData;
        files.push({
            filename: `esportazione_dati_agronomia_dati_produzione.csv`,
            data,
            headers: ['timestamp', 'pianta', 'temperatura', 'umidita', 'precipitazioni', 'raccolto', 'tempoCrescita']
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
