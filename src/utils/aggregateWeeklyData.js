export const aggregateWeeklyData = (data) => {
    const result = {};

    data.forEach(item => {
        const date = new Date(item.timestamp);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());

        const key = weekStart.toISOString().split('T')[0];

        if (!result[key]) {
            result[key] = {
                count: 0,
                temperatura: 0,
                umidita: 0,
                precipitazioni: 0,
                raccolto: 0
            };
        }

        result[key].count += 1;
        result[key].temperatura += item.temperatura;
        result[key].umidita += item.umidita;
        result[key].precipitazioni += item.precipitazioni;
        result[key].raccolto += item.raccolto;
    });

    return Object.entries(result).map(([week, vals]) => ({
        settimana: week,
        temperatura: (vals.temperatura / vals.count).toFixed(1),
        umidita: (vals.umidita / vals.count).toFixed(1),
        precipitazioni: vals.precipitazioni.toFixed(1),
        raccolto: vals.raccolto.toFixed(1)
    })).sort((a, b) => new Date(b.settimana) - new Date(a.settimana));
};
