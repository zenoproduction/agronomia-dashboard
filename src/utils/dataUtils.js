export function aggregateWeekly(data) {
    const grouped = {};

    data.forEach(item => {
        const date = new Date(item.timestamp);
        const year = date.getFullYear();
        const week = getWeekNumber(date);
        const key = `${year}-W${week}`;

        if (!grouped[key]) {
            grouped[key] = {
                timestamp: date,
                temperatura: [],
                umidita: [],
                precipitazioni: [],
                raccolto: [],
                tempoCrescita: [],
                consumoAcqua: [],
                costoManodopera: [],
                costoAttrezzature: [],
                costoManutenzione: [],
                ricavoDettaglio: [],
                ricavoGrossisti: [],
                ricavoOnline: []
            };
        }

        grouped[key].temperatura.push(item.temperatura);
        grouped[key].umidita.push(item.umidita);
        grouped[key].precipitazioni.push(item.precipitazioni);
        grouped[key].raccolto.push(item.raccolto);
        grouped[key].tempoCrescita.push(item.tempoCrescita);

        grouped[key].consumoAcqua.push(item.consumoAcqua);
        grouped[key].costoManodopera.push(item.costoManodopera);
        grouped[key].costoAttrezzature.push(item.costoAttrezzature);
        grouped[key].costoManutenzione.push(item.costoManutenzione);
        grouped[key].ricavoDettaglio.push(item.ricavoDettaglio);
        grouped[key].ricavoGrossisti.push(item.ricavoGrossisti);
        grouped[key].ricavoOnline.push(item.ricavoOnline);
    });

    return Object.entries(grouped).map(([_, group]) => ({
        timestamp: group.timestamp,
        temperatura: average(group.temperatura),
        umidita: average(group.umidita),
        precipitazioni: sum(group.precipitazioni),
        raccolto: sum(group.raccolto),
        tempoCrescita: average(group.tempoCrescita),

        consumoAcqua: sum(group.consumoAcqua),
        costoManodopera: sum(group.costoManodopera),
        costoAttrezzature: sum(group.costoAttrezzature),
        costoManutenzione: sum(group.costoManutenzione),
        ricavoDettaglio: sum(group.ricavoDettaglio),
        ricavoGrossisti: sum(group.ricavoGrossisti),
        ricavoOnline: sum(group.ricavoOnline)
    }));
}


function getWeekNumber(date) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + days) / 7);
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}
