const express = require('express');
const path = require('path');
const app = express();
const validaCPF = require('./valida_cpf');

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/valida-cpf', (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ valido: false, mensagem: "CPF não enviado" });
  }

  const valido = validaCPF(cpf);
  res.json({ valido, mensagem: valido ? "CPF válido" : "CPF inválido" });
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
