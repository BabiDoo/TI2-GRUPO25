const db = require('./db');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conexão bem-sucedida! Hora atual:', res.rows[0]);
  }

  db.end();
});
