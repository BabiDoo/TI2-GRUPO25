const db = require("../db");
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "../models/usuarios.json");

function readUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Rota de cadastro
// POST /auth/register
router.post("/register", async (req, res) => {
  const { nome, email, senha, matricula, tipo } = req.body;

  if (!nome || !email || !senha || !matricula) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const result = await db.query(
      "INSERT INTO usuarios (nome, email, senha, matricula, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, email, senha, matricula, tipo || "aluno"]
    );
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Email ou matrícula já cadastrados." });
    } else {
      console.error(err);
      res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
  }
});

// Rota de login
// POST /auth/login
router.post("/login", async (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res
      .status(400)
      .json({ error: "Matrícula e senha são obrigatórios." });
  }

  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE LOWER(matricula) = LOWER($1) AND senha = $2",
      [matricula, senha]
    );

    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    res.status(200).json({
      message: "Login bem-sucedido!",
      usuario: {
        nome: usuario.nome,
        matricula: usuario.matricula,
        tipo: usuario.tipo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});

module.exports = router;
