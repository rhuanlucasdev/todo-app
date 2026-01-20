//server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const db = require("./database.js"); // avisamos ao server que o bd existe e onde esta

// Middleware
app.use(express.json()); //permite que o servidor entenda dados em JSON
app.use(cors()); // premite conexoes do front

//rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do APP funcionando!" });
});

//start do server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
