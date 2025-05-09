const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const projetosRoutes = require('./routes/projetos'); // <= já pode vir aqui

const app = express(); // <= isso precisa vir antes de app.use

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/projetos', projetosRoutes); // <= só aqui você pode usar app

app.get('/', (req, res) => {
  res.send('API rodando com sucesso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
