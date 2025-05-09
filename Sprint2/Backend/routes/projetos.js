const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/projetos.json');

function readProjetos() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeProjetos(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// POST /api/projetos
router.post('/', (req, res) => {
  const { titulo, descricao, area, vagas } = req.body;

  if (!titulo || !descricao || !area || !vagas) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const projetos = readProjetos();
  const novoProjeto = { id: Date.now(), titulo, descricao, area, vagas };
  projetos.push(novoProjeto);
  writeProjetos(projetos);

  return res.status(201).json({ message: 'Projeto criado com sucesso!', projeto: novoProjeto });
});

router.get('/', (req, res) => {
  const projetos = readProjetos();
  res.json(projetos);
});

module.exports = router;
