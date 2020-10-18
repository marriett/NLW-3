const Database = require('sqlite-async');

function execute(db) {
    //console.log('entrei na função EXECUTE do banco de dados')
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            site TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );

    `)
}

//.then(execute) obriga o fluxo a esperar a linha de abertura do banco de dados terminar de executar
module.exports = Database.open(__dirname + "/database.sqlite").then(execute);