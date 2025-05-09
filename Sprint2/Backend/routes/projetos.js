const db = require('../db');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/projetos.json');

// POST /api/projetos
router.post('/', async (req, res) => {
  const { titulo, descricao, area, vagas } = req.body;

  if (!titulo || !descricao || !area || !vagas) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO projetos (titulo, descricao, area, vagas) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descricao, area, vagas]
    );
    res.status(201).json({ message: 'Projeto criado com sucesso!', projeto: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar projeto.' });
  }
});

// GET /api/projetos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM projetos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar projetos.' });
  }
});



module.exports = router;
