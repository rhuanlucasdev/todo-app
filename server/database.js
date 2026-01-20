// server/database.js
const sqlite3 = require("sqlite3").verbose();

// Nome do arquivo onde os dados vao estar
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    //se der erro ao abrir o bd, mostra no console
    console.log(err.message);
    throw err;
  } else {
    console.log("Conectado no banco de dados.");

    //Criar tabela de USERs
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Tabela já criada (erro esperado se reiniciar o servidor)
        } else {
          console.log("Tabela de usuários criada.");
        }
      },
    );

    //Criar tabela de TAREFAS
    db.run(
      `CREATE TABLE todo (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title text,
              completed INTEGER DEFAULT 0,
              user_id INTEGER,
              FOREIGN KEY (user_id) REFERENCES user(id)
              )`,
      (err) => {
        if (err) {
          //tabela ja criada
        } else {
          console.log("Tabela de tarefas criada");
        }
      },
    );
  }
});

module.exports = db;
