//server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const db = require("./database.js"); // avisamos ao server que o bd existe e onde esta
const md5 = require('md5');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Define uma chave para assinar os TOKENS
const SECRET_KEY = 'chave_super_secreta';

// Middleware
app.use(express.json()); //permite que o servidor entenda dados em JSON
app.use(cors()); // premite conexoes do front

//rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do APP funcionando!" });
});

//endpoint de registro user
app.post('/app/register', (req, res)=> {
  const {name, email, password} = req.body;

  //validacao
  if(!name || !email || !password){
    return res.status(400).json({error: "Preencha todos os campos."})
  }

  //Criptografar a senha (Hash)
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
  const params = [name, email, hash];

  //inserir no banco
  db.run(sql, params, function (err) {
    if(err) {
      //se for de duplicidade
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({error: "Email ja cadastrado"})
      }
      return res.status(500).json({error: err.message});
    }

    //retornar sucesso e o id do novo user
    res.json({
      message: "Usuario criado com sucesso",
      id: this.lastID
    });
  });
});

app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  const db = "SELECT * FROM user WHERE email = ?";

  //Busca o usuario pelo email
  db.get(sql, [email], (err, user) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    //se nao achar user
    if(!user){
      return res.result(404).json({error: "Usuario nao encontrado."});
    }

    //verificar senha
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if(!passwordIsValid){
      return res.status(401).json({auth: false, token: null, error: "Senha invalida."});
    }

    const token = jwt.sign({id: user.id}, SECRET_KEY, {
      expiresIn: 86400 //expira em 24h
    });

    res.status(200).json({auth: true, token: token, user: {id: user.id, name: user.name, email: user.email}});
  });
});

//start do server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
