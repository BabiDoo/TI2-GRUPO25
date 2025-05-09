const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFile = path.join(__dirname, '../models/usuarios.json');

function readUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Rota de cadastro
router.post('/register', (req, res) => {
  const { nome, email, senha, matricula, tipo } = req.body;

  if (!nome || !email || !senha || !matricula) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const users = readUsers();
  const userExists = users.find(u => u.matricula === matricula || u.email === email);

  if (userExists) {
    return res.status(409).json({ error: 'Usuário já cadastrado.' });
  }

  const novoUsuario = { nome, email, senha, matricula, tipo: tipo || 'aluno' };
  users.push(novoUsuario);
  writeUsers(users);

  return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
router.post('/login', (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ error: 'Matrícula e senha são obrigatórios.' });
  }

  const users = readUsers();
  const usuario = users.find(u => u.matricula === matricula && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  return res.status(200).json({
    message: 'Login bem-sucedido!',
    usuario: {
      nome: usuario.nome,
      matricula: usuario.matricula,
      tipo: usuario.tipo
    }
  });
});

module.exports = router;