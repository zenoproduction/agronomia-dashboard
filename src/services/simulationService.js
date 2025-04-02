function randomInRange(min, max, decimals = 1) {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimals));
}

const meteoCondizioni = [
    { nome: 'Soleggiato', icona: 'FaSun', min: 20, max: 40 },
    { nome: 'Parz. Nuvoloso', icona: 'FaCloudSun', min: 15, max: 30 },
    { nome: 'Nuvoloso', icona: 'FaCloud', min: 10, max: 25 },
    { nome: 'Pioggia', icona: 'FaCloudRain', min: 8, max: 20 },
    { nome: 'Temporale', icona: 'FaBolt', min: 10, max: 22 },
    { nome: 'Neve', icona: 'FaSnowflake', min: -5, max: 2 }
];

function getRandomMeteo() {
    const index = Math.floor(Math.random() * meteoCondizioni.length);
    return meteoCondizioni[index];
}

function generatePiante() {
    return [
        { nome: 'Pomodori', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(60, 90, 0), ricavo: randomInRange(200, 1000), costo: randomInRange(100, 500) },
        { nome: 'Lattuga', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(30, 45, 0), ricavo: randomInRange(150, 800), costo: randomInRange(80, 400) },
        { nome: 'Zucchine', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(50, 80, 0), ricavo: randomInRange(180, 900), costo: randomInRange(90, 450) },
        { nome: 'Melanzane', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(70, 100, 0), ricavo: randomInRange(250, 1100), costo: randomInRange(120, 600) },
        { nome: 'Peperoni', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(65, 95, 0), ricavo: randomInRange(220, 1000), costo: randomInRange(110, 550) },
        { nome: 'Cavoli', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(55, 85, 0), ricavo: randomInRange(190, 950), costo: randomInRange(95, 480) },
        { nome: 'Fagiolini', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(40, 70, 0), ricavo: randomInRange(170, 870), costo: randomInRange(85, 430) },
        { nome: 'Spinaci', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(25, 40, 0), ricavo: randomInRange(160, 800), costo: randomInRange(80, 400) },
        { nome: 'Carote', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(50, 75, 0), ricavo: randomInRange(200, 900), costo: randomInRange(100, 450) },
        { nome: 'Cipolle', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(60, 90, 0), ricavo: randomInRange(210, 950), costo: randomInRange(105, 475) },
        { nome: 'Aglio', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(90, 120, 0), ricavo: randomInRange(280, 1200), costo: randomInRange(130, 600) },
        { nome: 'Barbabietole', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(70, 100, 0), ricavo: randomInRange(230, 1000), costo: randomInRange(110, 550) },
        { nome: 'Broccoli', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(60, 85, 0), ricavo: randomInRange(200, 900), costo: randomInRange(100, 450) },
        { nome: 'Piselli', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(50, 80, 0), ricavo: randomInRange(180, 880), costo: randomInRange(90, 440) },
        { nome: 'Zucca', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(80, 110, 0), ricavo: randomInRange(250, 1100), costo: randomInRange(120, 550) },
        { nome: 'Rucola', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(25, 35, 0), ricavo: randomInRange(150, 750), costo: randomInRange(70, 350) },
        { nome: 'Basilico', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(30, 50, 0), ricavo: randomInRange(160, 800), costo: randomInRange(75, 400) },
        { nome: 'Finocchi', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(55, 85, 0), ricavo: randomInRange(200, 900), costo: randomInRange(100, 450) },
        { nome: 'Indivia', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(40, 60, 0), ricavo: randomInRange(180, 880), costo: randomInRange(90, 440) },
        { nome: 'Sedano', quantità: randomInRange(100, 500, 0), tempoRaccolto: randomInRange(60, 90, 0), ricavo: randomInRange(210, 950), costo: randomInRange(105, 475) },
    ];
}


export function generateHistoricalSimulatedData(daysBack = 180) {
    const simulated = [];
    const now = new Date();
    const allPiante = generatePiante();

    for (let i = 0; i < daysBack; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const meteo = getRandomMeteo();
        const temperatura = randomInRange(meteo.min, meteo.max);

        const raccolto = randomInRange(500, 3000, 0);
        const piante = generatePiante();
        const piantaRaccolta = piante[Math.floor(Math.random() * piante.length)].nome;

        simulated.push({
            timestamp: date.toISOString(),

            umidita: randomInRange(20, 100, 0),
            flussoAcqua: randomInRange(5, 50, 1),
            vento: randomInRange(0, 20, 1),
            phTerreno: randomInRange(4.5, 8.5, 1),

            phSuolo: randomInRange(5.5, 7.5, 1),
            nutrienteN: randomInRange(20, 80, 0),
            nutrienteP: randomInRange(10, 50, 0),
            nutrienteK: randomInRange(30, 100, 0),
            umiditaSuolo: randomInRange(10, 40, 0),

            raccolto,
            tempoCrescita: randomInRange(60, 120, 0),
            precipitazioni: randomInRange(0, 10),
            pianta: piantaRaccolta,

            temperatura,
            meteoCondizione: meteo.nome,
            meteoIcona: meteo.icona,

            consumoAcqua: randomInRange(200, 1000),
            consumoElettricita: randomInRange(50, 300),
            consumoFertilizzante: randomInRange(10, 50),
            consumoPesticida: randomInRange(5, 30),

            costoManutenzione: randomInRange(20, 150),
            costoAttrezzature: randomInRange(100, 500),
            costoManodopera: randomInRange(50, 300),

            ricavoDettaglio: randomInRange(200, 1000),
            ricavoGrossisti: randomInRange(300, 1500),
            ricavoOnline: randomInRange(100, 800),

            piante,

            appezzamenti: Array.from({ length: 10 }, (_, i) => {
                const nomeAppezzamento = `Appezzamento ${String.fromCharCode(65 + i)}`;
                return {
                    nome: nomeAppezzamento,
                    temperatura: randomInRange(10, 40),
                    umidita: randomInRange(20, 100, 0),
                    flussoAcqua: randomInRange(5, 50, 1),
                    vento: randomInRange(0, 20, 1),
                    phTerreno: randomInRange(4.5, 8.5, 1)
                };
            }),

            consumoEnergeticoPerKg: randomInRange(0.1, 1.5),
            co2PerUnita: randomInRange(0.2, 1.8),
            acquaRiciclataPercentuale: randomInRange(10, 60)
        });
    }

    return simulated.reverse();
}
