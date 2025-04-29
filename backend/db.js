// db.js
const Database = require('better-sqlite3');
const db = new Database('banco.db');

// Tabela de funcionários
db.prepare(`
  CREATE TABLE IF NOT EXISTS funcionarios (
    id TEXT PRIMARY KEY,
    nome TEXT,
    pis TEXT UNIQUE
)
`).run();

// Tabela de pontos
db.prepare(`
  CREATE TABLE IF NOT EXISTS pontos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    funcionarioId TEXT,
    dataHora TEXT,
    localizacao TEXT,
    foto TEXT,
    FOREIGN KEY(funcionarioId) REFERENCES funcionarios(id)
)
`).run();

module.exports = db;
